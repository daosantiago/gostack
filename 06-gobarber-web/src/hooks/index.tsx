import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

interface AppProviderProps {
  // eslint-disable-next-line react/require-default-props
  children: React.ReactNode;
}

// type AuthProviderProps = {
//   children: React.ReactNode; // 👈️ type children
// };

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
