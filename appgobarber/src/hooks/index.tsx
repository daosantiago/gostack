import React from 'react';

import { AuthProvider } from './auth';

interface AppProviderProps {
  // eslint-disable-next-line react/require-default-props
  children: React.ReactNode;
}

// type AuthProviderProps = {
//   children: React.ReactNode; // 👈️ type children
// };

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
