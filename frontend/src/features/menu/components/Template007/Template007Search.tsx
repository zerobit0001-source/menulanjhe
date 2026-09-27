"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Template007Search({ value, onChange }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
      className="mx-auto max-w-xl"
    >
      <div
        className={`
          flex h-12 items-center gap-2 rounded-2xl border bg-[#1C130D] px-4 transition-colors duration-200
          ${focused ? "border-[#B98252]" : "border-[#F5EBDD]/[0.08]"}
        `}
      >
        <Search
          size={18}
          className={`shrink-0 transition-colors ${
            focused ? "text-[#B98252]" : "text-[#CDBEAE]"
          }`}
        />

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="جستجو در منو..."
          className="h-full flex-1 bg-transparent text-sm text-[#F5EBDD] outline-none placeholder:text-[#8A7A6C]"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="flex h-6 w-6 items-center justify-center rounded-full text-[#CDBEAE] hover:text-[#F5EBDD]"
          >
            <X size={15} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
