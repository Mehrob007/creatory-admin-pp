"use client";
import Image from "next/image";
import React, { useState } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  errors?: { [key: string]: string };
  value: string;
  id: string;
  onChange: (e: string) => void;
  title: string;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  errors,
  title,
  id,
}: InputProps) {
  const [eye, setEye] = useState<boolean>(false);
  return (
    <div className="input">
      <label htmlFor={id}>{title}</label>
      <div>
        <input
          id={id}
          type={eye ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={errors?.[id] ? "error-input" : ""}
        />
        {type === "password" ? (
          <Image
            onClick={() => setEye(!eye)}
            src={eye ? "/icons/eye.svg" : "/icons/eye-closed.svg"}
            alt="eye"
            width={24}
            height={24}
          />
        ) : (
          ""
        )}
      </div>
      <p style={{ opacity: errors?.[id] ? 1 : 0 }}>{errors?.[id]}</p>
    </div>
  );
}
