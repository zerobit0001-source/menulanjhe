const num = new Intl.NumberFormat("fa-IR");

export const formatNumber = (n: number) => num.format(n);
export const formatMoney = (n: number) => `${num.format(Math.round(n))} تومان`;
export const formatRank = (n: number) =>
  new Intl.NumberFormat("fa-IR", { minimumIntegerDigits: 2 }).format(n);

export const formatDay = (iso: string) =>
  new Intl.DateTimeFormat("fa-IR", { month: "short", day: "numeric" }).format(
    new Date(`${iso}T12:00:00`)
  );
