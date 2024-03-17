import RegisterFormCard from '@/components/RegisterFormCard';
import React from 'react';

const Register = () => {
  return (
    <section className='bg-blue-50 min-h-screen flex-grow'>
      <div className='container m-auto max-w-lg py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <RegisterFormCard />
        </div>
      </div>
      <div className='flex-grow'></div>
    </section>
  );
};

export default Register;
