import ModernCategoryNav from "../components/ModernMenu/ModernCategoryNav";
import ModernHeader from "../components/ModernMenu/ModernHeader";
import ModernProductCard from "../components/ModernMenu/ModernProductCard";
import type { MenuData } from "../types/menu.types";

type ModernMenuProps = {
  menu: MenuData;
};

export default function ModernMenu({ menu }: ModernMenuProps) {
  return (
    <main className="min-h-screen bg-zinc-50">
      <ModernHeader shop={menu.shop} />

      <ModernCategoryNav categories={menu.categories} />

      <div className="mx-auto max-w-2xl px-5 py-6">
        {menu.categories.map((category) => (
          <section key={category.id} className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-zinc-900">
              {category.name}
            </h2>

            <div className="space-y-3">
              {category.products.map((product) => (
                <ModernProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
