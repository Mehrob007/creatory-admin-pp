import React from "react";

interface InputPages {
  id: string;
  value: string;
  title?: string;
  placeholder?: string;
  onChange: (e: string) => void;
  errors?: { [key: string]: string };
  styleText?: { [key: string]: string };
}
export default function InputPages({
  id,
  title,
  value,
  errors,
  onChange,
  placeholder,
}: InputPages) {
  return (
    <div className="InputPages">
      {title ? <label id={id}>{title}</label> : ""}
      <input
        type=""
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        id={id}
      ></input>
      <p style={{ opacity: errors?.[id] ? 1 : 0 }}>{errors?.[id]}</p>
    </div>
  );
}
