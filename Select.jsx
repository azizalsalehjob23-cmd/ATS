import React from 'react';

export default function Select({ options, value, onChange }) {
  return (
    <select value={value} onChange={onChange} className="border rounded px-3 py-2 w-full">
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
