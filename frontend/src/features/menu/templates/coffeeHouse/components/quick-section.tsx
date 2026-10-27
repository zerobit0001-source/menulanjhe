"use client";
import type { QuickSectionData } from "../adapter";
import { ProductGrid } from "./product-grid";

interface Props {
  section: QuickSectionData;
  quantityOf: (id: string) => number;
  onAdd: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export function QuickSection({ section, ...grid }: Props) {
  return (
    <section className="ch-quick" aria-labelledby={`ch-quick-${section.id}`}>
      <h2 id={`ch-quick-${section.id}`} className="ch-section__title">
        {section.title}
      </h2>
      <ProductGrid products={section.products} {...grid} />
    </section>
  );
}
