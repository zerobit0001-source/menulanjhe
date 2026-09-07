import type { MenuData } from "../types/menu.types";

export const demoMenu: MenuData = {
  shop: {
    name: "کافه لانژه",
    description: "قهوه، دسر و نوشیدنی‌های خاص",
  },

  categories: [
    {
      id: "coffee",
      name: "قهوه",
      products: [
        {
          id: "espresso",
          name: "اسپرسو",
          description: "شات اسپرسوی خالص",
          price: 85000,
        },
        {
          id: "americano",
          name: "آمریکانو",
          description: "اسپرسو با آب داغ",
          price: 95000,
        },
        {
          id: "latte",
          name: "لاته",
          description: "اسپرسو، شیر و فوم شیر",
          price: 125000,
        },
      ],
    },

    {
      id: "cold-drinks",
      name: "نوشیدنی سرد",
      products: [
        {
          id: "iced-latte",
          name: "آیس لاته",
          description: "لاته خنک با یخ",
          price: 135000,
        },
        {
          id: "mojito",
          name: "موهیتو",
          description: "لیموی تازه، نعناع و سودا",
          price: 145000,
        },
      ],
    },

    {
      id: "desserts",
      name: "دسر",
      products: [
        {
          id: "cheesecake",
          name: "چیزکیک",
          description: "چیزکیک کلاسیک با سس توت‌فرنگی",
          price: 155000,
        },
      ],
    },
  ],
};
