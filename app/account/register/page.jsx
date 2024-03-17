'use client';

import { useState, useEffect, useContext } from 'react';

import Link from 'next/link';

import { FaGoogle } from 'react-icons/fa';

import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords Do Not Match');
    }
  };
  return (
    <section className='bg-blue-50 min-h-screen flex-grow'>
      <div className='container m-auto max-w-lg py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={handleSubmit}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Create An Account
            </h2>

            <div className='mb-4'>
              <button
                className='bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
                type='submit'
              >
                <FaGoogle className='text-white mr-2' />
                Register with Google
              </button>
            </div>

            <div className='my-6 font-semibold text-center'>
              Or register with your email address
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 font-bold mb-2'
                htmlFor='name'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Full name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <label
                className='block text-gray-700 font-bold mb-2'
                htmlFor='passwordConfirm'
              >
                Confirm Password
              </label>
              <input
                type='password'
                id='passwordConfirm'
                name='passwordConfirm'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Confirm Password'
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <button
                className='bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Register
              </button>
            </div>
            <div className='text-center'>
              <p>
                Do You Have An Account?{' '}
                <Link
                  href={'/account/login'}
                  className='underline text-cyan-600'
                >
                  Login
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

export default Register;
