'use client';

import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

const variants = {
  primary: 'bg-teal-600 text-white hover:bg-teal-500 shadow-sm hover:shadow-md hover:shadow-teal-500/20 active:translate-y-px',
  secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm active:translate-y-px',
  danger: 'bg-red-600 text-white hover:bg-red-500 shadow-sm hover:shadow-red-500/20 active:translate-y-px',
  ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs h-8',
  md: 'px-4 py-2 text-sm h-10',
  lg: 'px-6 py-3 text-base h-12',
};

import Link from 'next/link';

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  href,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  icon?: ReactNode;
  href?: string;
}) {
  const styles = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={styles}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}
