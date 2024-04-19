import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// POST /api/auth/register
export const POST = async (request) => {
  try {
    await connectDB();

    const { email, username, password } = await request.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already in use' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    s;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // return Response.redirect(`${process.env.NEXTAUTH_URL}/auth/login`);

    return new Response(
      JSON.stringify({ message: 'Registration Successful' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.log(error);

    let errorMessage = 'Failed to register user.';
    // Customize error message based on specific error types
    if (error.message.includes('Username')) {
      errorMessage = 'Username is already taken.';
    } else if (error.message.includes('Email')) {
      errorMessage = 'Email is already registered.';
    }

    return new Response(errorMessage, { status: 400 });
  }
};
