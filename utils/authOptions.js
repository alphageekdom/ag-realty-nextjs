import connectDB from '@/config/database';
import User from '@/models/User';

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

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
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        await connectDB();
        const { email, password } = credentials;

        // Return early if email or password is empty
        if (!email || !password) {
          throw new Error('Invalid credentials');
        }

        try {
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error('User not found');
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Error occurred during authentication:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    jwt: true,
  },
  database: process.env.MONGODB_URI,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Modify the session object
    async session({ session, token }) {
      await connectDB();
      const user = await User.findById(token.sub);
      if (user) {
        session.user.id = user.id;
        session.user.userId = user._id;
        session.user.isAdmin = user.isAdmin;
      }
      return session;
    },
  },

  // Invoked on successful sign-in
  async signIn({ user, account, profile, email, credentials }) {
    await connectDB();

    const userExists = await User.findOne({ email: profile.email });

    if (!userExists) {
      // Truncate username if too long
      const name = profile.username.slice(0, 20);

      await User.create({
        email: profile.email,
        name,
        image: profile.picture,
      });
    }
    return true;
  },
};
