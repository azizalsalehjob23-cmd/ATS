import React from "react";

// عناصر وهمية لدعم التركيب ولا تُعرض
export function SelectTrigger({ children }) { return null; }
SelectTrigger.displayName = "SelectTrigger";

export function SelectContent({ children }) { return <>{children}</>; }
SelectContent.displayName = "SelectContent";

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
SelectItem.displayName = "SelectItem";

export function SelectValue() { return null; }
SelectValue.displayName = "SelectValue";

// المكوّن الرئيسي
export function Select({ value, onValueChange, children, className = "" }) {
  // نجمع العناصر <SelectItem> من أي عمق داخل SelectContent
  const items = [];
  const walk = (kids) => {
    React.Children.forEach(kids, (child) => {
      if (!child) return;
      if (child.type?.displayName === "SelectItem") {
        items.push(child);
      } else if (child.props?.children) {
        walk(child.props.children);
      }
    });
  };
  walk(children);

  return (
    <select
      className={`select ${className}`}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
    >
      {items.length ? items : children}
    </select>
  );
}
