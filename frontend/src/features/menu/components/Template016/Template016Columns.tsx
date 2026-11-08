"use client";

import Template016Block from "./Template016Block";
import Template016Branding from "./Template016Branding";
import type { Template016Layout } from "./layout";
import type { CartControls } from "./utils";

type Props = {
  layout: Template016Layout;
  shopName: string;
  description?: string;
  controls: CartControls;
};

/**
 * Desktop: three physical columns (left | center | right), as on the printed
 * original. Mobile: the columns dissolve (`contents`) into a single vertical
 * flow — branding first, then left, center and right blocks in menu order.
 * Rows inside stay RTL.
 */
export default function Template016Columns({
  layout,
  shopName,
  description,
  controls,
}: Props) {
  const column = "contents lg:flex lg:flex-col lg:gap-6";

  return (
    <div
      dir="ltr"
      className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_1.12fr_1fr] lg:items-start lg:gap-8"
    >
      <div dir="rtl" className={column}>
        {layout.left.map((block, i) => (
          <Template016Block
            key={block.id}
            block={block}
            controls={controls}
            index={i + 1}
          />
        ))}
      </div>

      <div dir="rtl" className={column}>
        <div className="order-first lg:order-none">
          <Template016Branding shopName={shopName} description={description} />
        </div>

        {layout.center.map((block, i) => (
          <Template016Block
            key={block.id}
            block={block}
            controls={controls}
            index={i + 1}
          />
        ))}
      </div>

      <div dir="rtl" className={column}>
        {layout.right.map((block, i) => (
          <Template016Block
            key={block.id}
            block={block}
            controls={controls}
            index={i + 1}
          />
        ))}
      </div>
    </div>
  );
}
