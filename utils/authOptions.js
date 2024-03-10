import GoogleProvider from 'next-auth/providers/google';

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
  ],
  callbacks: {
    // Invoked on successful sign-in
    async signIn({ profile }) {
      // Connect to database
      // Check if user exists
      // User does not exist, add to database
      // Return true to allow sign-in
    },
    // Modify the session object
    async session({ session }) {
      // Get user from database
      // Assign user id to the session
      // Return the session
    },
  },
};
