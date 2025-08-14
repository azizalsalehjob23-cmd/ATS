import React from 'react';

export default function Switch({ checked, onChange }) {
  return (
    <label className="flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
      <span className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${checked ? 'bg-blue-500' : ''}`}>
        <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-5' : ''}`}></span>
      </span>
    </label>
  );
}
