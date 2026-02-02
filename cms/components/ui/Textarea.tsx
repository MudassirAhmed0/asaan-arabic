'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
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
      <textarea
        ref={ref}
        className={`
          w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl
          transition-all duration-200 ease-in-out
          placeholder:text-gray-400
          focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 focus:outline-none
          hover:bg-gray-100 hover:border-gray-300
          disabled:opacity-60 disabled:cursor-not-allowed
          px-4 py-3 resize-y
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50/30' : ''}
          ${className}
        `}
        {...props}
      />
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

Textarea.displayName = 'Textarea';

export default Textarea;
