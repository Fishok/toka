import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * A styled input component with optional icons, validation, and error display.
 *
 * @param {object} props - Component props.
 * @param {string} props.value - The current value of the input.
 * @param {React.ReactNode} [props.label] - Optional label displayed above the input.
 * @param {string} [props.placeholder='Placeholder'] - Placeholder text shown when input is empty.
 * @param {(value: string) => void} props.onChange - Handler called when the input value changes.
 * @param {() => void} [props.onClear] - Optional function to call when clearing the input.
 * @param {React.ReactElement} [props.leadingIcon] - Optional icon displayed at the start.
 * @param {React.ReactElement} [props.trailingIcon] - Optional icon displayed at the end.
 * @param {'email' | 'password' | 'text'} [props.type='text'] - Type of input.
 * @param {string} [props.className] - Additional class names for wrapper.
 * @param {string} [props.errorMessage] - Optional error message to display.
 * @returns {JSX.Element} The rendered input element.
 */
const Input = ({
                 value,
                 label,
                 placeholder = 'Placeholder',
                 onChange,
                 onClear,
                 leadingIcon,
                 trailingIcon,
                 className,
                 errorMessage,
                 type = 'text',
               }) => {
  return (
    <div className={twMerge('w-64', className)}>
      {label && (
        <div className="text-sm text-naturals-800 leading-[18px] mb-2">
          {label}
        </div>
      )}
      <div
        className={twMerge(
          `flex items-center w-full h-[32px] px-4 py-2 gap-2 border rounded-[4px] bg-secondary ${
            errorMessage ? 'border-red-500' : 'border-naturals-200'
          }`
        )}
      >
        {leadingIcon && (
          <div className="flex items-center justify-center">{leadingIcon}</div>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-primary text-sm"
        />
        {trailingIcon && (
          <div className="cursor-pointer" onClick={onClear}>
            {trailingIcon}
          </div>
        )}
      </div>
      {errorMessage && (
        <span data-testid="error" className="text-red-500 text-xs">
          {errorMessage}
        </span>
      )}
    </div>
  );
};


export default Input;
