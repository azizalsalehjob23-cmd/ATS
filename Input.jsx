import React from "react";

export function Input({ className = "", ...props }) {
  return <input className={`input ${className}`} {...props} />;
}

export function Textarea({ className = "", rows = 4, ...props }) {
  return <textarea className={`textarea ${className}`} rows={rows} {...props} />;
}

export function Label({ className = "", children, ...props }) {
  return (
    <label className={`label ${className}`} {...props}>
      {children}
    </label>
  );
}
