import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export type ToastMessage = {
  message: string;
  type: 'success' | 'error';
};

interface ToastContextData {
  showToast: (toast: ToastMessage) => void;
}

interface ToastProviderProps {
  children?: React.ReactNode;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastState, setToastState] = useState<ToastMessage | null>(null);

  const handleShowToast = (toastMessage: ToastMessage) => {
    setToastState(toastMessage);
  };

  useEffect(() => {
    if (toastState) {
      const { message, type } = toastState;

      switch (type) {
        case 'success':
          toast.success(message);
          break;
        case 'error':
          toast.error(message);
          break;
        default:
          throw new Error(`${type} is not handled`);
      }
      setToastState(null);
    }
  }, [toastState]);

  return (
    <ToastContext.Provider
      value={{
        showToast: handleShowToast,
      }}
    >
      {children}
      <Toaster
        toastOptions={{
          success: {
            icon: null,
            style: {
              background: '#65a30d',
              color: '#fff',
              fontWeight: 'bold',
            },
          },
          error: {
            icon: null,
            style: {
              background: '#b91c1c',
              color: '#fff',
              fontWeight: 'bold',
            },
          },
        }}
      />
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('Use Toast must be wrapped in a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
