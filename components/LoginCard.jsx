'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';
import DOMPurify from 'dompurify';

const LoginCard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.replace('/'); // Redirect to home if already logged in
    }
  }, [session, router]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      const { email, password } = formData;

      // Sanitize email and password inputs using DOMPurify
      const sanitizedEmail = DOMPurify.sanitize(email);
      const sanitizedPassword = DOMPurify.sanitize(password);

      // Validate email and password
      if (!sanitizedEmail || !sanitizedPassword) {
        toast.error('Please enter both email and password');
        setLoading(false);
        return;
      }

      signIn('credentials', {
        redirect: false,
        email: sanitizedEmail,
        password: sanitizedPassword,
      }).then((res) => {
        setLoading(false);
        if (res.error) {
          console.log(res.error);
          toast.error(res.error);
        } else {
          router.push('/');
        }
      });
    },
    [formData, router]
  );

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
          autoComplete='current-email'
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
          autoComplete='current-password'
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
          <Link href={'/register'} className='underline text-cyan-600'>
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginCard;
