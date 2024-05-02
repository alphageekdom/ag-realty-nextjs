import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

const saltRounds = 12;

export const registerUser = async (email, name, password) => {
  await connectDB();

  // Validate input
  const errors = validationResult({ email, name, password });
  if (!errors.isEmpty()) {
    throw {
      statusCode: 400,
      message: 'Validation failed',
      errors: errors.array(),
    };
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { statusCode: 409, message: 'Email already in use' };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return { statusCode: 200, message: 'Registration Successful' };
};

// POST /api/register
export const POST = async (request) => {
  try {
    const { email, name, password } = await request.json();
    const response = await registerUser(email, name, password);
    return new Response(JSON.stringify(response), {
      status: response.statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Registration error:', error);
    const statusCode = error.statusCode || 500;
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: statusCode, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
