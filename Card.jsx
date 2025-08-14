import React from 'react';

export default function Card({ title, children }) {
  return (
    <div className="border rounded p-4 bg-white shadow">
      {title && <h2 className="font-semibold mb-3">{title}</h2>}
      {children}
    </div>
  );
}
