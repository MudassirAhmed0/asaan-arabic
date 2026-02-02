'use client';

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  required,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      
      <div className="relative group">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={`
            w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl
            transition-all duration-200 ease-in-out
            placeholder:text-gray-400
            focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 focus:outline-none
            hover:bg-gray-100 hover:border-gray-300
            disabled:opacity-60 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-10' : 'px-4'}
            ${rightIcon ? 'pr-10' : 'px-4'}
            py-2.5
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50/30' : ''}
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-1.5 text-xs text-gray-500 ml-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
