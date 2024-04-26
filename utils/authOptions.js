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

          // User not found
          if (!user) {
            throw new Error('User not found');
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          // Invalid password
          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          const userData = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };

          return userData;
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
  callbacks: {
    // Invoked on successful sign-in
    async signIn({ profile }) {
      // Connect to database
      await connectDB();
      // Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // User does not exist, add to database
      if (!userExists) {
        // Truncate username if too long
        const name = profile.username.slice(0, 20);

        await User.create({
          email: profile.email,
          name,
          image: profile.picture,
        });
      }
      // Return true to allow sign-in
      return true;
    },

    // Modify the session object
    async session({ session }) {
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign the user id to the session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
};
