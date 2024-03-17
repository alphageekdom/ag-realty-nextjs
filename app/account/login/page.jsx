'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    login({ email, password });
  };
  return (
    <section className='bg-blue-50 min-h-screen flex-grow'>
      <div className='container m-auto max-w-lg py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={handleSubmit}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Login</h2>
            <div className='mb-4'>
              <button
                className='bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
                type='submit'
              >
                <FaGoogle className='mr-2' /> Login with Google
              </button>
            </div>

            <div className='my-6 font-semibold text-center'>
              Or log in with your email address
            </div>

            <div className='mb-4'>
              <label
                className='block text-gray-700 font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Email address'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label
                className='block text-gray-700 font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <button
                className='bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Login
              </button>
            </div>
            <div className='text-center'>
              <p>
                Don't Have An Account?{' '}
                <Link
                  href={'/account/register'}
                  className='underline text-cyan-600'
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className='flex-grow'></div>
    </section>
  );
};

export default LoginPage;
