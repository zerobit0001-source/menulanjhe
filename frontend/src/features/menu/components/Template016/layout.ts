import type {
  MenuCategory,
  MenuProduct,
} from "@/features/menu/types/menu.types";

/** How a category is typeset. */
export type BlockVariant = "list" | "main" | "dessert" | "drink";

export type Template016Block =
  | {
      kind: "category";
      id: string;
      variant: BlockVariant;
      category: MenuCategory;
    }
  | { kind: "special"; id: string; products: MenuProduct[] };

export type Template016Layout = {
  left: Template016Block[];
  center: Template016Block[];
  right: Template016Block[];
};

/** Rough height of the branding panel, counted as product rows. */
const BRANDING_WEIGHT = 7;

const weightOf = (category: MenuCategory) => category.products.length + 2;

/** Split an ordered list (≥ 3) into three contiguous groups of similar height. */
function partition(
  categories: MenuCategory[],
): [MenuCategory[], MenuCategory[], MenuCategory[]] {
  const n = categories.length;
  const prefix = [0];

  categories.forEach((category) => {
    prefix.push(prefix[prefix.length - 1] + weightOf(category));
  });

  let bestI = 1;
  let bestJ = 2;
  let bestCost = Number.POSITIVE_INFINITY;

  for (let i = 1; i <= n - 2; i += 1) {
    for (let j = i + 1; j <= n - 1; j += 1) {
      const left = prefix[i];
      const center = prefix[j] - prefix[i] + BRANDING_WEIGHT;
      const right = prefix[n] - prefix[j];
      const cost = Math.max(left, center, right);

      if (cost < bestCost) {
        bestCost = cost;
        bestI = i;
        bestJ = j;
      }
    }
  }

  return [
    categories.slice(0, bestI),
    categories.slice(bestI, bestJ),
    categories.slice(bestJ),
  ];
}

const categoryBlock = (
  category: MenuCategory,
  variant: BlockVariant,
): Template016Block => ({
  kind: "category",
  id: category.id,
  variant,
  category,
});

/**
 * Maps the menu's own ordered categories onto the printed-menu composition:
 *  - left   : first group (list style) + the "Special" block (popular products)
 *  - center : branding + middle group (main-course style)
 *  - right  : last group (dessert style) + the final category as the Drink block
 * With fewer than 4 categories there is no Drink block; with fewer than 3 the
 * right (and then the left) column stays empty. Nothing here invents data.
 */
export function buildLayout(
  categories: MenuCategory[],
  specialProducts: MenuProduct[],
): Template016Layout {
  const cats = categories.filter((category) => category.products.length > 0);
  const drink = cats.length >= 4 ? cats[cats.length - 1] : null;
  const rest = drink ? cats.slice(0, -1) : cats;

  let leftCats: MenuCategory[] = [];
  let centerCats: MenuCategory[] = [];
  let rightCats: MenuCategory[] = [];

  if (rest.length >= 3) {
    [leftCats, centerCats, rightCats] = partition(rest);
  } else if (rest.length === 2) {
    leftCats = [rest[0]];
    centerCats = [rest[1]];
  } else if (rest.length === 1) {
    centerCats = [rest[0]];
  }

  const left = leftCats.map((category) => categoryBlock(category, "list"));

  if (specialProducts.length > 0) {
    left.splice(Math.min(1, left.length), 0, {
      kind: "special",
      id: "special",
      products: specialProducts,
    });
  }

  const center = centerCats.map((category) => categoryBlock(category, "main"));

  const right = rightCats.map((category) =>
    categoryBlock(category, "dessert"),
  );

  if (drink) right.push(categoryBlock(drink, "drink"));

  return { left, center, right };
}
