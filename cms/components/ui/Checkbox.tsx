'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || props.name || undefined;

  return (
    <div
      className={`flex items-center gap-3 p-3 border border-gray-200 rounded-xl w-full bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer ${className}`}
      onClick={() => document.getElementById(inputId || '')?.click()}
    >
      <input
        ref={ref}
        type="checkbox"
        id={inputId}
        className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500/20 border-gray-300"
        {...props}
      />
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
