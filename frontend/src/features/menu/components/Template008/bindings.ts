/**
 * ALL assumptions about the shared layer live in this file.
 * If a hook/type signature differs in the real project, fix it here only —
 * the Template008* components depend solely on the T7* shapes below.
 */
import { useMenuCart } from "../../hooks/useMenuCart"; // TODO
import { useMenuSearch } from "../../hooks/useMenuSearch"; // TODO
import { useMenuOrder } from "../../hooks/useMenuOrder"; // TODO
import { MenuData } from "../../types/menu.types";

export interface T7Product {
  id: string | number;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  available: boolean;
}
export interface T7Category {
  id: string | number;
  name: string;
  products: T7Product[];
}
export interface T7Shop {
  name: string;
  description?: string | null;
  logo?: string | null;
}
export interface T7Model {
  shop: T7Shop;
  categories: T7Category[];
  featured: T7Product[];
  all: T7Product[];
}

/* eslint-disable @typescript-eslint/no-explicit-any -- single adapter boundary */
export function toT7Model(data: MenuData): T7Model {
  const d = data as any;
  const categories: T7Category[] = (d.categories ?? []).map((c: any) => ({
    id: c.id,
    name: c.name,
    products: (c.products ?? []) as T7Product[],
  }));
  const all = categories.flatMap((c) => c.products);
  const byId = new Map(all.map((p) => [String(p.id), p]));

  // quickSections: assumed [{ key|type|slug, products? | productIds? }]
  const section = (d.quickSections ?? []).find((s: any) =>
    /feature|popular/i.test(String(s.key ?? s.type ?? s.slug ?? s.title ?? ""))
  );
  const featured: T7Product[] = section
    ? (section.products ?? (section.productIds ?? []).map((id: any) => byId.get(String(id)))).filter(Boolean)
    : [];

  return {
    shop: {
      name: d.shop?.name ?? "",
      description: d.shop?.description ?? null,
      logo: d.shop?.logo ?? null,
    },
    categories,
    featured,
    all,
  };
}

export interface T7CartLine {
  product: T7Product;
  quantity: number;
}
export function useT7Cart() {
  const c = useMenuCart() as any; // TODO: assumed shape below
  return {
    lines: (c.items ?? []) as T7CartLine[],
    count: (c.totalCount ?? 0) as number,
    total: (c.totalPrice ?? 0) as number,
    quantityOf: (id: T7Product["id"]): number =>
      (c.items ?? []).find((l: T7CartLine) => String(l.product.id) === String(id))?.quantity ?? 0,
    add: (p: T7Product) => c.addItem(p) as void,
    increment: (id: T7Product["id"]) => c.increment(id) as void,
    decrement: (id: T7Product["id"]) => c.decrement(id) as void,
    remove: (id: T7Product["id"]) => c.removeItem(id) as void,
    clear: () => c.clear() as void,
  };
}

export function useT7Search(products: T7Product[]) {
  const s = useMenuSearch(products as any) as any; // TODO: assumed { query, setQuery, results }
  return {
    query: (s.query ?? "") as string,
    setQuery: s.setQuery as (v: string) => void,
    results: (s.results ?? products) as T7Product[],
  };
}

export function useT7Order() {
  const o = useMenuOrder() as any; // TODO: assumed { submit(input) => Promise<unknown>, isSubmitting, error }
  return {
    submitting: Boolean(o.isSubmitting),
    error: (o.error ? String(o.error?.message ?? o.error) : null) as string | null,
    submit: async (input: { customerName?: string; notes?: string }): Promise<boolean> => {
      try {
        await o.submit(input);
        return true;
      } catch {
        return false;
      }
    },
  };
}
