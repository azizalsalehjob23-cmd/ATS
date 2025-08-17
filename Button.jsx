// Button.jsx
import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',        // اجعله "submit" داخل الفورم ليشتغل onSubmit
  variant = 'primary',
  disabled = false,
  className = '',
}) {
  const base =
    'w-full px-4 py-2 rounded border transition active:scale-[0.99] focus:outline-none focus:ring';
  const variants = {
    primary:
      'bg-blue-600 text-white border-blue-700 hover:bg-blue-700 disabled:opacity-50',
    secondary:
      'bg-gray-200 text-gray-900 border-gray-300 hover:bg-gray-300 disabled:opacity-50',
    danger:
      'bg-red-600 text-white border-red-700 hover:bg-red-700 disabled:opacity-50',
  };
  const styles = variants[variant] || variants.primary;

  function handleClick(e) {
    // مهم: لا نمنع الإجراء إذا كان الزر submit حتى يشتغل onSubmit حق الفورم
    if (type !== 'submit') {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!disabled && typeof onClick === 'function') onClick(e);
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
