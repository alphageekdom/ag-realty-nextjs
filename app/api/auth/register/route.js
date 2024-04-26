import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

// POST /api/register
export const POST = async (request) => {
  try {
    await connectDB();

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return new Response(JSON.stringify({ errors: errors.array() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { email, name, password } = await request.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already in use' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    await newUser.save();

    // return Response.redirect(`${process.env.NEXTAUTH_URL}/auth/login`);

    return new Response(
      JSON.stringify({ message: 'Registration Successful' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.log(error);
    return new Response(errorMessage, { status: 400 });
  }
};
