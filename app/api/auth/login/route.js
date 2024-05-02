import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { signIn } from 'next-auth/react';
import { validationResult } from 'express-validator';

const saltRounds = 12;

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw { statusCode: 401, message: "User Doesn't Exist" };
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw { statusCode: 401, message: 'Invalid Credentials' };
  }

  return user;
};

// POST /api/auth/login
export const POST = async (request) => {
  try {
    await connectDB();

    const { email, password } = await request.json();

    const errors = validationResult(email, password);

    if (!errors.isEmpty()) {
      return new Response(JSON.stringify({ errors: errors.array() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await loginUser(email, password);

    // Return success response
    return new Response(JSON.stringify({ message: 'Login successful', user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
