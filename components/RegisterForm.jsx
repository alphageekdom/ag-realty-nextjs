import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';

const RegisterForm = ({ formData, loading, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-3xl text-center font-semibold mb-6'>
        Create An Account
      </h2>

      <div className='mb-4'>
        <button
          className='bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
          type='button' // Changed to button to prevent form submission
        >
          <FaGoogle className='text-white mr-2' />
          Register with Google
        </button>
      </div>

      <div className='my-6 font-semibold text-center'>
        Or register with your email address
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2' htmlFor='name'>
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Full name'
          required
          value={formData.name}
          onChange={handleChange}
          autoComplete='new-name'
        />
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
          autoComplete='new-email'
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
          autoComplete='new-password'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='confirmPassword'
          className='block text-gray-700 font-bold mb-2'
        >
          Confirm Password
        </label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Confirm Password'
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete='new-password'
        />
      </div>

      <div className='mb-4'>
        <button
          className='bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
      <div className='text-center'>
        <p>
          Do You Have An Account?{' '}
          <Link href={'/login'} className='underline text-cyan-600'>
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
