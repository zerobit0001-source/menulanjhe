"use client";

import { motion } from "framer-motion";

import { BotanicalSprig, DotRow } from "./Ornaments";
import { SERIF, V016 } from "./utils";

type Props = {
  shopName: string;
  description?: string;
};

/** Central logo panel: ornamental label, MENU title, botanical line art, subtitle. */
export default function Template016Branding({ shopName, description }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center px-3 py-6 text-center"
      style={{ color: V016.dark }}
    >
      <span
        className="rounded-full px-5 py-1.5 text-xs font-bold"
        style={{
          border: `1px solid ${V016.border}`,
          backgroundColor: V016.cream,
        }}
      >
        {shopName}
      </span>

      <div className="mt-5 flex w-full items-center justify-center gap-2" style={{ color: V016.brownLight }}>
        <BotanicalSprig className="h-8 w-24 sm:w-28" />

        <span
          aria-hidden
          className="h-1.5 w-1.5 rotate-45"
          style={{ backgroundColor: V016.brownLight }}
        />

        <BotanicalSprig className="h-8 w-24 sm:w-28" flip />
      </div>

      <h2
        className="my-1 text-6xl font-bold leading-tight sm:text-7xl"
        style={{
          fontFamily: SERIF,
          letterSpacing: "0.18em",
          paddingInlineStart: "0.18em",
        }}
      >
        MENU
      </h2>

      <DotRow className="w-44" />

      <p
        className="mt-3 text-[11px] font-semibold"
        style={{
          color: V016.muted,
          fontFamily: description ? undefined : SERIF,
          letterSpacing: description ? undefined : "0.4em",
        }}
      >
        {description || "DELICIOUS FOOD"}
      </p>
    </motion.header>
  );
}
