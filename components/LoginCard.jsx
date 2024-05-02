'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';
import DOMPurify from 'dompurify';
import LoginForm from './LoginForm';

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
    <>
      <LoginForm
        formData={formData}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default LoginCard;
