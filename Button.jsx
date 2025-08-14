import React from 'react';

export default function Button({ children, onClick, type = 'button', variant = 'primary', disabled }) {
  const base = 'px-4 py-2 rounded focus:outline-none';
  const styles = variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black';
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
