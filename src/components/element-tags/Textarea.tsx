"use client";
// import { useFormStore } from "@/hooks/useFormStore";
import React, { useRef, useEffect } from "react";

interface TextareaProps {
  id: string;
  value: string;
  title?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  errors?: { [key: string]: string };
  styleText?: React.CSSProperties;
  listMode?: boolean;
  textInfo?: string;
  edit?: boolean;
}

export default function Textarea({
  id,
  title,
  value,
  errors,
  onChange,
  styleText,
  placeholder,
  listMode = false,
  textInfo,
  edit = true,
}: TextareaProps) {
  // const { data } = useFormStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    const lineCount = value?.split(/\r?\n/).length;
    if (lineCount <= 1 || !lineCount) {
      el.style.height = styleText?.height as string;
    } else {
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && listMode) {
      e.preventDefault();

      const cursorPos = textareaRef.current?.selectionStart || 0;
      const textBeforeCursor = value.substring(0, cursorPos);
      const textAfterCursor = value.substring(cursorPos);
      const lineStart = textBeforeCursor.lastIndexOf("\n") + 1;
      const currentLine = textBeforeCursor.substring(lineStart);

      const marker = currentLine.trim().startsWith("$") ? "$" : "• ";
      const newText = textBeforeCursor + "\n" + marker;

      onChange(newText + textAfterCursor);

      setTimeout(() => {
        if (textareaRef.current) {
          const newCursorPos =
            cursorPos + newText.length - textBeforeCursor.length;
          textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    }
  };
  // console.log("value", JSON.stringify(value));

  return (
    <div className="textarea">
      {title && <label htmlFor={id}>{title}</label>}
      <textarea
        ref={textareaRef}
        style={{
          ...styleText,
          resize: "none",
          overflow: "hidden",
          height: "auto",
          // lineHeight: styleText?.fontSize,
        }}
        onChange={(e) => {
          if (edit) onChange(e.target.value);
        }}
        onKeyDown={listMode ? handleKeyDown : undefined}
        value={value}
        placeholder={listMode ? "$ Начните список..." : placeholder}
        id={id}
      />
      {errors?.[id] && <p style={{ opacity: 1, color: "red" }}>{errors[id]}</p>}
      {textInfo && <p>*Сейчас загружен файл:</p>}
      {/* *Сейчас загружен файл: |#59E991&Видео основное.mp4 */}
    </div>
  );
}
