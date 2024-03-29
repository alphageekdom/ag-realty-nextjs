'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LoginCard = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Login Successful!');
        router.push('/');
      } else {
        toast.error(data.error || 'Login Failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something Went Wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
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
        <label className='block text-gray-700 font-bold mb-2' htmlFor='email'>
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Email address'
          required
          value={formData.email}
          onChange={handleChange}
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
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className='mb-4'>
        <button
          className='bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      <div className='text-center'>
        <p>
          Don't Have An Account?{' '}
          <Link href={'/auth/register'} className='underline text-cyan-600'>
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginCard;
