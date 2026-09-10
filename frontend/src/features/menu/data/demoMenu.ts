import type { MenuData } from "../types/menu.types";

export const demoMenu: MenuData = {
  shop: {
    name: "کافه لانژه",
    logo: "/images/demo/logo.png",
    description: "طعم خوب، حال خوب ☕️",
  },

  quickSections: [
    {
      id: "popular",
      title: "محبوب‌ترین",
      type: "popular",
      products: [
        {
          id: "burger-classic",
          name: "برگر کلاسیک",
          description: "گوشت گریل‌شده، کاهو، گوجه، خیارشور و سس مخصوص",
          price: 285000,
          image: "/images/demo/burger-classic.jpg",
          available: true,
        },
        {
          id: "pizza-pepperoni",
          name: "پیتزا پپرونی",
          description: "پپرونی، پنیر موزارلا و سس مخصوص",
          price: 395000,
          image: "/images/demo/pizza-pepperoni.jpg",
          available: true,
        },
        {
          id: "pasta-alfredo",
          name: "پاستا آلفردو",
          description: "پاستا، مرغ گریل‌شده و سس آلفردو",
          price: 320000,
          image: "/images/demo/pasta-alfredo.jpg",
          available: true,
        },
      ],
    },

    {
      id: "discount",
      title: "تخفیف‌ها",
      type: "discount",
      products: [
        {
          id: "mojito",
          name: "موهیتو",
          description: "نعناع تازه، لیمو، سودا و سیروپ مخصوص",
          price: 145000,
          originalPrice: 180000,
          discountPercent: 20,
          image: "/images/demo/mojito.jpg",
          available: true,
        },
        {
          id: "chicken-burger",
          name: "چیکن برگر",
          description: "مرغ سوخاری، کاهو، پنیر و سس مخصوص",
          price: 260000,
          originalPrice: 310000,
          discountPercent: 16,
          image: "/images/demo/chicken-burger.jpg",
          available: true,
        },
      ],
    },
  ],

  categories: [
    {
      id: "pizza",
      name: "پیتزا",
      products: [
        {
          id: "pizza-pepperoni",
          name: "پیتزا پپرونی",
          description: "پپرونی، پنیر موزارلا، سس گوجه و زیتون",
          price: 395000,
          image: "/images/demo/pizza-pepperoni.jpg",
          available: true,
        },
        {
          id: "pizza-margherita",
          name: "پیتزا مارگاریتا",
          description: "سس گوجه، پنیر موزارلا، ریحان تازه",
          price: 330000,
          image: "/images/demo/pizza-margherita.jpg",
          available: true,
        },
        {
          id: "pizza-chicken",
          name: "پیتزا چیکن",
          description: "مرغ گریل‌شده، قارچ، فلفل دلمه‌ای و پنیر",
          price: 385000,
          image: "/images/demo/pizza-chicken.jpg",
          available: true,
        },
        {
          id: "pizza-meat",
          name: "پیتزا گوشت و قارچ",
          description: "گوشت چرخ‌کرده، قارچ، فلفل دلمه‌ای و پنیر",
          price: 410000,
          image: "/images/demo/pizza-meat.jpg",
          available: false,
        },
      ],
    },

    {
      id: "burger",
      name: "برگر",
      products: [
        {
          id: "burger-classic",
          name: "برگر کلاسیک",
          description: "گوشت گریل‌شده، کاهو، گوجه، خیارشور و سس مخصوص",
          price: 285000,
          image: "/images/demo/burger-classic.jpg",
          available: true,
        },
        {
          id: "burger-cheese",
          name: "چیزبرگر",
          description: "گوشت گریل‌شده، پنیر چدار، کاهو و سس مخصوص",
          price: 320000,
          image: "/images/demo/cheeseburger.jpg",
          available: true,
        },
        {
          id: "chicken-burger",
          name: "چیکن برگر",
          description: "مرغ سوخاری، پنیر، کاهو و سس مخصوص",
          price: 260000,
          originalPrice: 310000,
          discountPercent: 16,
          image: "/images/demo/chicken-burger.jpg",
          available: true,
        },
        {
          id: "double-burger",
          name: "دبل برگر",
          description: "دو عدد گوشت گریل‌شده، پنیر چدار و سس مخصوص",
          price: 390000,
          image: "/images/demo/double-burger.jpg",
          available: true,
        },
      ],
    },

    {
      id: "pasta",
      name: "پاستا",
      products: [
        {
          id: "pasta-alfredo",
          name: "پاستا آلفردو",
          description: "پاستا، مرغ گریل‌شده، قارچ و سس آلفردو",
          price: 320000,
          image: "/images/demo/pasta-alfredo.jpg",
          available: true,
        },
        {
          id: "pasta-arrabiata",
          name: "پاستا آرابیاتا",
          description: "پاستا، سس گوجه تند، سیر و ریحان",
          price: 275000,
          image: "/images/demo/pasta-arrabiata.jpg",
          available: true,
        },
        {
          id: "pasta-pesto",
          name: "پاستا پستو",
          description: "پاستا، سس پستو، مرغ گریل‌شده و پنیر پارمزان",
          price: 335000,
          image: "/images/demo/pasta-pesto.jpg",
          available: true,
        },
      ],
    },

    {
      id: "appetizer",
      name: "پیش‌غذا",
      products: [
        {
          id: "garlic-bread",
          name: "نان سیر",
          description: "نان تازه با کره سیر و پنیر موزارلا",
          price: 125000,
          image: "/images/demo/garlic-bread.jpg",
          available: true,
        },
        {
          id: "chicken-strips",
          name: "چیکن استریپس",
          description: "فیله مرغ سوخاری با سس مخصوص",
          price: 210000,
          image: "/images/demo/chicken-strips.jpg",
          available: true,
        },
        {
          id: "french-fries",
          name: "سیب‌زمینی سرخ‌کرده",
          description: "سیب‌زمینی ترد با سس مخصوص",
          price: 110000,
          image: "/images/demo/fries.jpg",
          available: true,
        },
      ],
    },

    {
      id: "salad",
      name: "سالاد",
      products: [
        {
          id: "caesar-salad",
          name: "سالاد سزار",
          description: "کاهو، مرغ گریل‌شده، نان تست و سس سزار",
          price: 245000,
          image: "/images/demo/caesar-salad.jpg",
          available: true,
        },
        {
          id: "greek-salad",
          name: "سالاد یونانی",
          description: "خیار، گوجه، زیتون، پنیر فتا و سبزیجات تازه",
          price: 210000,
          image: "/images/demo/greek-salad.jpg",
          available: true,
        },
      ],
    },

    {
      id: "hot-drinks",
      name: "نوشیدنی گرم",
      products: [
        {
          id: "espresso",
          name: "اسپرسو",
          description: "یک شات اسپرسو با دانه‌های تازه‌برشت",
          price: 95000,
          image: "/images/demo/espresso.jpg",
          available: true,
        },
        {
          id: "americano",
          name: "آمریکانو",
          description: "اسپرسو و آب داغ",
          price: 115000,
          image: "/images/demo/americano.jpg",
          available: true,
        },
        {
          id: "latte",
          name: "لاته",
          description: "اسپرسو، شیر بخار داده‌شده و فوم شیر",
          price: 155000,
          image: "/images/demo/latte.jpg",
          available: true,
        },
        {
          id: "cappuccino",
          name: "کاپوچینو",
          description: "اسپرسو، شیر بخار داده‌شده و فوم شیر",
          price: 150000,
          image: "/images/demo/cappuccino.jpg",
          available: true,
        },
      ],
    },

    {
      id: "cold-drinks",
      name: "نوشیدنی سرد",
      products: [
        {
          id: "mojito",
          name: "موهیتو",
          description: "نعناع تازه، لیمو، سودا و سیروپ مخصوص",
          price: 145000,
          originalPrice: 180000,
          discountPercent: 20,
          image: "/images/demo/mojito.jpg",
          available: true,
        },
        {
          id: "iced-latte",
          name: "آیس لاته",
          description: "اسپرسو، شیر سرد و یخ",
          price: 165000,
          image: "/images/demo/iced-latte.jpg",
          available: true,
        },
        {
          id: "lemonade",
          name: "لیموناد",
          description: "لیمو تازه، سودا و نعناع",
          price: 135000,
          image: "/images/demo/lemonade.jpg",
          available: true,
        },
      ],
    },

    {
      id: "dessert",
      name: "دسر",
      products: [
        {
          id: "cheesecake",
          name: "چیزکیک",
          description: "چیزکیک نیویورکی با سس توت‌فرنگی",
          price: 180000,
          image: "/images/demo/cheesecake.jpg",
          available: true,
        },
        {
          id: "brownie",
          name: "براونی شکلاتی",
          description: "براونی شکلاتی با بستنی وانیلی",
          price: 165000,
          image: "/images/demo/brownie.jpg",
          available: true,
        },
        {
          id: "tiramisu",
          name: "تیرامیسو",
          description: "لایه‌های بیسکویت، قهوه، ماسکارپونه و کاکائو",
          price: 195000,
          image: "/images/demo/tiramisu.jpg",
          available: true,
        },
      ],
    },
  ],
};
