import React from "react";

export function Button({ children, className = "", variant = "primary", ...props }) {
  const base = "btn";
  const styles = variant === "secondary" ? "btn-secondary" : "btn-primary";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
