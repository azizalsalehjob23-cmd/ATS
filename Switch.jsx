import React from "react";

export function Switch({ checked, onCheckedChange }) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange?.(!checked)}
      className={`switch-root ${checked ? "bg-indigo-600" : "bg-neutral-300"}`}
      aria-pressed={checked}
    >
      <span
        className={`switch-thumb ${checked ? "translate-x-5" : "translate-x-1"}`}
      />
    </button>
  );
}
