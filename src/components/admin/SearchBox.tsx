"use client";

import { useEffect, useState } from "react";
import { inputClass } from "./ui";

/** Debounced search input. Give it a new `key` to reset it (e.g. "Clear filters"). */
export function SearchBox({
  value,
  onSearch,
  label,
  placeholder,
}: {
  value: string;
  onSearch: (v: string) => void;
  label: string;
  placeholder?: string;
}) {
  const [text, setText] = useState(value);

  useEffect(() => {
    if (text.trim() === value) return;
    const t = setTimeout(() => onSearch(text.trim()), 400);
    return () => clearTimeout(t);
  }, [text, value, onSearch]);

  return (
    <div className="min-w-0 flex-1 sm:max-w-xs">
      <label htmlFor="admin-search" className="sr-only">{label}</label>
      <input
        id="admin-search"
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className={`${inputClass} mt-0`}
      />
    </div>
  );
}
