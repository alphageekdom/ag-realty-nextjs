import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error('Incorrect password');
        }

        return user;
      },
    }),
  ],
  database: process.env.MONGODB_URI,
  callbacks: {
    async signIn({ user, profile }) {
      await connectDB();
      const userExists = await User.findOne({ email: user.email });
      if (!userExists) {
        const username = profile.name ? profile.name.slice(0, 20) : 'Anonymous';
        await User.create({
          email: user.email,
          username,
          image: profile.picture,
        });
      }
      return true;
    },
    async session({ session }) {
      await connectDB();
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/error', // Error code passed in query string as ?error=
  },
};
