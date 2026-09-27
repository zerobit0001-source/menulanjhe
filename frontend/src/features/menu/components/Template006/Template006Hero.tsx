import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

import type { MenuData } from "@/features/menu/types/menu.types";

type Props = {
  shop: MenuData["shop"];
};

export default function Template006Hero({ shop }: Props) {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.10] via-white/[0.04] to-transparent px-6 py-10"
      >
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/[0.04] blur-3xl" />

        <div className="relative">
          <div className="mb-5 flex items-center gap-2 text-white/40">
            <Sparkles size={14} />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Welcome
            </span>
          </div>

          <h2 className="max-w-2xl text-4xl font-black leading-[1.2] tracking-tight sm:text-5xl">
            {shop.name}
          </h2>

          {shop.description && (
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/45">
              {shop.description}
            </p>
          )}

          <div className="mt-8 flex items-center gap-2 text-xs text-white/30">
            <ArrowDown size={14} />
            <span>منو را مشاهده کنید</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
