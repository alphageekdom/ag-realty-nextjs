import Link from 'next/link';

const LoginForm = ({ formData, loading, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-3xl text-center font-semibold mb-6'>Login</h2>

      {/* Email Input */}
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

      {/* Password Input */}
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

      {/* Submit Button */}
      <div className='mb-4'>
        <button
          className='bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>

      {/* Register Link */}
      <div className='text-center'>
        <p>
          Don{`'`}t Have An Account?{' '}
          <Link href={'/register'} className='underline text-cyan-600'>
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
