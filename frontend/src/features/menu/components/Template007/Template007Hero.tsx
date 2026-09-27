"use client";

import { motion } from "framer-motion";

type Props = {
  shopName: string;
  description?: string;
};

export default function Template007Hero({ shopName, description }: Props) {
  return (
    <section className="relative overflow-hidden">
      {/* radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(185,130,82,0.35) 0%, rgba(185,130,82,0) 70%)",
        }}
      />

      {/* subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(245,235,221,0.9) 0.6px, transparent 0.6px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-10 text-center sm:px-6 sm:pt-14">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gradient-to-b from-[#F5EBDD] to-[#B98252] bg-clip-text text-3xl font-black leading-tight text-transparent sm:text-4xl"
        >
          {shopName}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mx-auto mt-3 max-w-md text-sm text-[#CDBEAE]"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
