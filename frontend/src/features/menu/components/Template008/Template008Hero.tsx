import type { T7Shop } from "./bindings";

export function Template008Hero({ shop }: { shop: T7Shop }) {
  return (
    <section className="px-4 pb-2 pt-6">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-[#E5E5E5] bg-white px-6 py-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] md:px-10 md:py-12">
        <div className="mb-4 h-1.5 w-10 rounded-full bg-[#F5C400]" />
        <h1 className="text-[28px] font-bold leading-tight text-[#171717] md:text-4xl">{shop.name}</h1>
        {shop.description ? (
          <p className="mt-3 max-w-xl text-sm leading-7 text-[#737373] md:text-base">{shop.description}</p>
        ) : (
          <p className="mt-3 text-sm text-[#737373]">منو را مرور کنید و سفارش خود را ثبت کنید.</p>
        )}
      </div>
    </section>
  );
}
