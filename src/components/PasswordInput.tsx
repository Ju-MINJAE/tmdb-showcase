import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FieldError } from 'react-hook-form';

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: string;
  error?: string | FieldError['message'];
  required?: boolean;
  showPasswordToggle?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      id,
      label,
      error,
      required,
      className = '',
      showPasswordToggle = true,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={showPassword ? 'text' : 'password'}
            {...props}
            className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm 
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
          {showPasswordToggle && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={`absolute right-0 top-0 h-full px-3 py-2 
                text-gray-600 hover:text-gray-900 focus:outline-none 
                focus:ring-2 focus:ring-blue-500 rounded-r-md
                disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              tabIndex={0}
              disabled={props.disabled}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600" id={`${id}-error`} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
