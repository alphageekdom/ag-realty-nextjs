'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import RegisterForm from '@/components/RegisterForm';

const RegisterCard = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const validateForm = useCallback((formData) => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email address');
      return false;
    }

    return true;
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      const sanitizedFormData = {
        name: DOMPurify.sanitize(formData.name),
        email: DOMPurify.sanitize(formData.email),
        password: DOMPurify.sanitize(formData.password),
        confirmPassword: DOMPurify.sanitize(formData.confirmPassword),
      };

      const isValid = validateForm(sanitizedFormData);
      if (!isValid) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sanitizedFormData),
        });

        if (res.ok) {
          toast.success('Registration Successful!');
          router.push('/login');
        } else if (res.status === 409) {
          toast.error('Email Already In Use');
        } else {
          const data = await res.json();
          toast.error(data.message || 'Registration Failed');
        }
      } catch (error) {
        console.error(error);
        toast.error('Something Went Wrong');
      } finally {
        setLoading(false);
      }
    },
    [formData, router, validateForm]
  );

  return (
    <RegisterForm
      formData={formData}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegisterCard;
