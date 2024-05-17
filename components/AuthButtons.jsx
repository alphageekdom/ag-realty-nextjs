import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const AuthButtons = ({ session, providers }) => {
  return (
    <div>
      {!session && (
        <div className='hidden md:block md:ml-6'>
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => signIn('credentials')}
              className='flex items-center text-white bg-blue-500 hover:bg-blue-700 rounded-md px-3 py-2'
            >
              <span>Login or Register</span>
            </button>

            {providers &&
              Object.values(providers).map(
                (provider, index) =>
                  provider.id === 'google' && (
                    <button
                      onClick={() => signIn(provider.id)}
                      key={index}
                      className='flex items-center text-white bg-gray-700 hover:bg-gray-900 rounded-md px-3 py-2'
                    >
                      <FaGoogle className='text-white mr-2' />
                      <span>Sign in with Google</span>
                    </button>
                  )
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
