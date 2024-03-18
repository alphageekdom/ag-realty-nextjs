import { createContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState('');
  const [error, setError] = useState('');

  // Register User
  const register = async (user) => {
    console.log(user);
  };
  // Login User
  const login = async ({ email: identifier, password }) => {
    console.log({ identifier, password });
  };
  // Logout User
  const logout = async () => {
    console.log('Logout');
  };
  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    console.log('Check');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
