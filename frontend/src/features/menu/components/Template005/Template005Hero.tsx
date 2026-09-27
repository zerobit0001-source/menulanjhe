import type { MenuData } from "@/features/menu/types/menu.types";

type Props = {
  shop: MenuData["shop"];
};

export default function Template005Hero({ shop }: Props) {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-8">
      <div className="rounded-[2rem] bg-slate-950 px-6 py-8 text-white">
        <p className="mb-3 text-xs font-medium text-slate-400">خوش آمدید</p>

        <h2 className="text-2xl font-black tracking-tight">{shop.name}</h2>

        {shop.description && (
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
            {shop.description}
          </p>
        )}
      </div>
    </section>
  );
}
