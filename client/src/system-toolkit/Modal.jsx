import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@/shared/icons/x-mark.svg?react';
import Button from './Button.jsx';

/**
 * A reusable modal component with confirm/cancel actions.
 *
 * Renders the modal in a portal to `document.body`, with a backdrop and header/footer sections.
 *
 * @param {Object} props - Modal configuration and content.
 * @param {React.ReactNode} props.title - Title of the modal (string, JSX, etc.).
 * @param {string} [props.confirmText='Ok'] - Text for the confirm button.
 * @param {string} [props.cancelText='Cancel'] - Text for the cancel button.
 * @param {() => void} props.close - Callback to close the modal.
 * @param {React.ReactNode} props.children - Content of the modal body.
 * @param {() => void | Promise<void>} [props.onConfirm] - Optional confirm button handler.
 * @param {boolean} [props.disableConfirm] - If true, disables the confirm button.
 * @returns {React.ReactPortal} The rendered modal element.
 */
const Modal = ({
                 title,
                 confirmText = 'Ok',
                 cancelText = 'Cancel',
                 close,
                 children,
                 onConfirm,
                 disableConfirm,
               }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className="z-[100] fixed left-0 top-0 w-[100vw] h-[100vh] flex justify-center items-center bg-black/30 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        className="border border-naturals-200 rounded-lg overflow-hidden min-w-[525px] w-fit bg-white"
      >
        <div className="p-3 pl-4 flex justify-between text-primary border-b border-naturals-200 bg-naturals-50 items-center">
          <span>{title}</span>
          <CloseIcon data-testid="close-icon" className="cursor-pointer" onClick={close} />
        </div>
        <div>{children}</div>
        <div className="p-3 flex justify-end border-t border-naturals-200">
          <div className="flex">
            <Button className="mr-2" variant="secondary" onClick={close}>
              {cancelText}
            </Button>
            <Button disabled={disableConfirm} onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
