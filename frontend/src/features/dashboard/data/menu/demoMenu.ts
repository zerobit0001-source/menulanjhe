interface MenuTemplate {
  id: string;
  name: string;
  description: string;
  available: boolean;
}

export const menuTemplates: MenuTemplate[] = [
  {
    id: "template001",
    name: "مدرن",
    description: "طراحی مدرن و مناسب کافه و رستوران",
    available: true,
  },
  {
    id: "template002",
    name: "کلاسیک",
    description: "طراحی ساده و کلاسیک",
    available: true,
  },
  {
    id: "template003",
    name: "مینیمال",
    description: "طراحی مینیمال و ساده",
    available: true,
  },
  {
    id: "template005",
    name: "مرتب",
    description: "ظراحی مرتب و تمیز مناسب رستوران",
    available: true,
  },
  {
    id: "template006",
    name: "مشکی",
    description: "طراحی دارک و مشکی مخصوص کافه ها با تم مشکی",
    available: true,
  },
  {
    id: "template007",
    name: "قهوه ای",
    description: "طراحی مدرن مخصوص کافه ها با تم قهوه ای",
    available: true,
  },
  {
    id: "template008",
    name: "جذاب",
    description: "طراحی مدرن مخصوص کافه ها با تم روشن و جذاب",
    available: true,
  },
  // {
  //   id: "CoffeeHouseTemplate",
  //   name: "قهوه خانه",
  //   description: "طراحی مدرن مخصوص کافه ها با تم روشن و جذاب",
  //   available: true,
  // },
  {
    id: "template011",
    name: "تمام‌صفحه",
    description:
      "نمایش هر محصول به‌صورت تمام‌صفحه با اسلاید بین محصولات هر دسته؛ مناسب کافه‌ها و رستوران‌هایی که عکس غذا را در اولویت می‌دانند",
    available: true,
  },
  {
    id: "template012",
    name: "گرید",
    description:
      "نمایش محصولات در شبکه‌ای از کارت‌های تصویری با دکمه افزودن سریع و دسته‌بندی کشویی؛ مناسب منوهای پرمحصول",
    available: true,
  },
  {
    id: "template013",
    name: "مات پریمیوم",
    description:
      "طراحی تیره و مات با رنگ طلایی ملایم و فهرست تحریری؛ مناسب رستوران‌ها و کافه‌های لوکس",
    available: true,
  },
  {
    id: "template014",
    name: "جریان دسته‌ها",
    description:
      "طراحی تیره با تم قهوه‌ای و نارنجی؛ مرور منو دسته‌به‌دسته با ناوبری قبلی و بعدی و سبد خرید ثابت در پایین صفحه، مناسب رستوران‌ها و کافه‌های شب‌محور",
    available: true,
  },
  {
    id: "template015",
    name: "گشوده",
    description:
      "طراحی روشن و گرم با دسته‌بندی‌های بازشونده؛ با یک لمس هر دسته باز می‌شود و محصولات متنی آن با انیمیشن نرم و جلوه‌های شیشه‌ای نمایش داده می‌شود",
    available: true,
  },
];
