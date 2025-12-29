"use client";
import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary'|'ghost'|'danger';
};

export default function Button({ children, variant='primary', className='', ...props }: Props) {
  const base = 'px-4 py-2 rounded-md text-sm font-semibold inline-flex items-center justify-center';
  const styles = {
    primary: 'bg-primary text-white hover:opacity-95',
    ghost: 'bg-transparent border border-gray-200 text-darkText',
    danger: 'bg-red-600 text-white'
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
