'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  name?: string;
  onChange?: (e: { target: { value: string } }) => void;
  required?: boolean;
  leftIcon?: React.ReactNode;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function Select({
  label,
  error,
  helperText,
  options,
  value: controlledValue,
  defaultValue,
  name,
  onChange,
  required,
  leftIcon,
  className = '',
  placeholder = 'Select an option',
  disabled,
}: SelectProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const currentValue = isControlled ? controlledValue : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((opt) => opt.value === currentValue);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && selectedOption) {
      const idx = options.findIndex(o => o.value === selectedOption.value);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    } else if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen, selectedOption, options]);

  useEffect(() => {
    if (isOpen && listRef.current && highlightedIndex >= 0) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, isOpen]);

  function handleSelect(newValue: string) {
    if (disabled) return;
    if (!isControlled) setInternalValue(newValue);
    onChange?.({ target: { value: newValue } });
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen) {
          if (options[highlightedIndex]) {
            handleSelect(options[highlightedIndex].value);
          }
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
        }
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  }

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {name && <input type="hidden" name={name} value={currentValue} />}

      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={`
            w-full flex items-center justify-between
            bg-gray-50 border text-sm rounded-xl
            transition-all duration-200 ease-in-out
            py-2.5 px-4
            ${leftIcon ? 'pl-10' : ''}
            focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10
            ${
              error
                ? 'border-red-300 focus:border-red-500 bg-red-50/30 text-red-900'
                : isOpen
                ? 'bg-white border-teal-500 ring-4 ring-teal-500/10'
                : 'border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-900'
            }
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {leftIcon && (
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors pointer-events-none ${isOpen ? 'text-teal-500' : 'text-gray-400'}`}>
              {leftIcon}
            </div>
          )}

          <span className={`block truncate ${!selectedOption?.label ? 'text-gray-400' : ''}`}>
            {selectedOption?.label || placeholder}
          </span>

          <span className={`pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-500' : 'text-gray-400'}`}>
            <ChevronDown className="h-4 w-4" />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top">
            <div
              ref={listRef}
              className="max-h-60 overflow-auto py-1 custom-scrollbar outline-none"
              role="listbox"
            >
              {options.map((opt, idx) => {
                const isSelected = opt.value === currentValue;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`
                      flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors
                      ${isSelected ? 'bg-teal-50 text-teal-800 font-medium' : ''}
                      ${isHighlighted && !isSelected ? 'bg-gray-50 text-gray-900' : ''}
                      ${!isSelected && !isHighlighted ? 'text-gray-700' : ''}
                    `}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check className="h-4 w-4 text-teal-600" />}
                  </div>
                );
              })}
              {options.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-400 text-center">No options available</div>
              )}
            </div>
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
}
