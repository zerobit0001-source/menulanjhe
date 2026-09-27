"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Template006Search({ value, onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25 }}
      className="mx-auto max-w-5xl px-4 pt-5"
    >
      <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 transition focus-within:border-white/20">
        <Search size={18} className="shrink-0 text-white/30" />

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="جستجو در منو..."
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-white/30 transition hover:text-white"
          >
            <X size={17} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
