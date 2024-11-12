import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string | FieldError['message'];
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, required, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          id={id}
          {...props}
          className={`w-full px-3 py-2 border rounded-md shadow-sm 
            ${error ? 'border-red-500' : 'border-gray-300'}
            focus:outline-none focus:ring-2 
            ${
              error
                ? 'focus:ring-red-500 focus:border-red-500'
                : 'focus:ring-blue-500 focus:border-blue-500'
            }
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && (
          <p className="text-sm text-red-600" id={`${id}-error`} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
