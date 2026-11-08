import { DoubleRule } from "./Ornaments";
import { SERIF, V016 } from "./utils";

/** Large rectangular brown header (STARTER / MAIN COURSE / DESSERT style). */
export function RectHeader({ title, count }: { title: string; count?: string }) {
  return (
    <div
      className="relative px-4 py-3 text-center"
      style={{
        backgroundColor: V016.brown,
        color: V016.bg,
        boxShadow: `inset 0 0 0 3px ${V016.brown}, inset 0 0 0 4px ${V016.cream}77`,
      }}
    >
      <h3 className="text-xl font-black leading-8">{title}</h3>

      {count && (
        <p className="text-[10px] font-semibold opacity-85">{count}</p>
      )}
    </div>
  );
}

/** Heading framed by double horizontal lines (SPECIAL MENU style). */
export function DoubleRuleHeading({ title }: { title: string }) {
  return (
    <div className="py-1">
      <DoubleRule />

      <h3
        className="py-2.5 text-center text-lg font-black"
        style={{ color: V016.dark, fontFamily: SERIF }}
      >
        {title}
      </h3>

      <DoubleRule />
    </div>
  );
}
