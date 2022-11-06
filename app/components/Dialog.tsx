import React from 'react';

interface DialogProps {
  content?: React.ReactNode;
  onButtonCloseClick?(): void;
}

type DialogRef = HTMLDialogElement;

const Dialog = React.forwardRef<DialogRef, DialogProps>(({ onButtonCloseClick, content }, ref) => {
  return (
    <dialog
      ref={ref}
      className="min-w-[350px] min-h-[155px] absolute bg-gray-50 rounded border border-white drop-shadow"
    >
      <div className="absolute top-2 right-4">
        <div
          onClick={onButtonCloseClick}
          className="cursor-pointer text-neutral-600 font-bold text-lg"
        >
          ✖
        </div>
      </div>
      <div className="w-full">{content}</div>
    </dialog>
  );
});

Dialog.displayName = 'Dialog';
export { Dialog };
