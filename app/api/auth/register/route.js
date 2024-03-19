import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// POST /api/auth
export const POST = async (request) => {
  try {
    await connectDB();

    const userData = await request.json();

    // Input validation
    if (
      !userData ||
      !userData.username ||
      !userData.email ||
      !userData.password
    ) {
      throw new Error('Invalid input data.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user object
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    });

    await newUser.save();

    // return Response.redirect(`${process.env.NEXTAUTH_URL}/auth/login`);

    return new Response(JSON.stringify('Registration Successful'), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed To Add Property', { status: 500 });
  }
};
