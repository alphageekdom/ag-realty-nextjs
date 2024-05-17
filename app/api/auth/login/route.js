import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const loginUser = async (email, password) => {
  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    throw { statusCode: 401, message: 'Invalid email or password' };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { statusCode: 401, message: 'Invalid email or password' };
  }

  return { statusCode: 200, message: 'Login Successful', user };
};

// POST /api/auth/login
export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    const response = await loginUser(email, password);
    return new Response(JSON.stringify(response), {
      status: response.statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Login error:', error);
    const statusCode = error.statusCode || 500;
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: statusCode, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
