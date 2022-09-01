import React, { createContext, useCallback, useContext } from 'react';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

type ToastProviderProps = {
  children: React.ReactNode; // 👈️ type children
};

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('Toast added');
  }, []);

  const removeToast = useCallback(() => {
    console.log('Toast removed');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be inside a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
