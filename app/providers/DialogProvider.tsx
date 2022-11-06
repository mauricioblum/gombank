import React, { createContext, useContext, useRef, useState } from 'react';
import { Dialog } from '../components';

interface DialogContextData {
  openDialog(content?: React.ReactNode, replaceUrl?: string): void;
  closeDialog(): void;
}

interface DialogProviderProps {
  children?: React.ReactNode;
}

const DialogContext = createContext<DialogContextData>({} as DialogContextData);

const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [replaceUrl, setReplaceUrl] = useState('');

  const handleOpen = (content?: React.ReactNode, replace?: string) => {
    if (replace) {
      setReplaceUrl(replace);
    }
    if (dialogRef.current && content) {
      setContent(content);
      dialogRef.current.removeAttribute('open');
      dialogRef.current.showModal();
    }
  };

  const handleClose = () => {
    if (dialogRef.current) {
      replaceUrl && window.location.replace(replaceUrl);
      dialogRef.current.close();
    }
  };

  return (
    <DialogContext.Provider
      value={{
        openDialog: handleOpen,
        closeDialog: handleClose,
      }}
    >
      {children}
      <Dialog ref={dialogRef} content={content} onButtonCloseClick={handleClose} />
    </DialogContext.Provider>
  );
};

function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('Use Dialog must be wrapped in a DialogProvider');
  }

  return context;
}

export { DialogProvider, useDialog };
