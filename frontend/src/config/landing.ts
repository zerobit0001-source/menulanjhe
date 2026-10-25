import {
  BarChart3,
  ClipboardList,
  Coffee,
  CupSoda,
  FolderTree,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  Link2,
  Package,
  Printer,
  QrCode,
  RefreshCw,
  Sandwich,
  Smartphone,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type ContactPoint = {
  id: string;
  label: string; // e.g. "تلفن"
  value: string; // text shown to the visitor
  href: string; // e.g. "tel:+98...", "mailto:...", "https://..."
  kind: "phone" | "email" | "link";
};

export type NavLink = { label: string; href: string };

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Set to false to hide a feature that is not live yet. */
  enabled: boolean;
};

export type MenuTemplate = {
  id: string;
  name: string;
  description: string;
};

export type Step = { id: string; title: string; description: string };

export type DashboardShot = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  enabled: boolean;
};

export type Business = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ProblemSolutionPair = {
  id: string;
  icon: LucideIcon;
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
};

export type FaqItem = { id: string; question: string; answer: string };

/* -------------------------------------------------------------------------- */
/*  Site configuration — EDIT THESE VALUES                                    */
/* -------------------------------------------------------------------------- */

export const siteConfig = {
  name: "منو لاژو",
  nameEn: "Menu Lanjhe",
  description:
    "منو لاژو پلتفرم منوی دیجیتال و مدیریت منوی QR Code برای کافه‌ها، رستوران‌ها، فست‌فودها و کسب‌وکارهای مشابه است.",

  /**
   * TODO: Real URL of a setup-request form / page / chat link (optional).
   * While null, every «درخواست راه‌اندازی» button scrolls to the contact
   * section in the footer.
   */
  requestUrl: null as string | null,

  /** TODO: Real public demo menu URL. While null, demo buttons scroll to #demo. */
  demoUrl: null as string | null,

  /** TODO: Real dashboard login route (e.g. "/login"). While null, no login link is shown. */
  loginUrl: null as string | null,

  /**
   * TODO: Real contact points. Leave empty until they are confirmed; the footer
   * will show a configuration notice instead of inventing any.
   *
   * Example:
   * { id: "phone", label: "تلفن", value: "۰۲۱-...", href: "tel:+98...", kind: "phone" }
   */
  contacts: [] as ContactPoint[],
};

export const requestHref: string = siteConfig.requestUrl ?? "#contact-info";
export const demoHref: string = siteConfig.demoUrl ?? "#demo";

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export const navLinks: NavLink[] = [
  { label: "خانه", href: "#home" },
  { label: "امکانات", href: "#features" },
  { label: "قالب‌های منو", href: "#templates" },
  { label: "نحوه کار", href: "#how-it-works" },
  { label: "سوالات متداول", href: "#faq" },
  { label: "تماس با ما", href: "#contact-info" },
];

/* -------------------------------------------------------------------------- */
/*  Problem → solution                                                        */
/* -------------------------------------------------------------------------- */

export const problemSolutionPairs: ProblemSolutionPair[] = [
  {
    id: "print",
    icon: Printer,
    problemTitle: "چاپ دوباره با هر تغییر",
    problemText:
      "هر بار که محصولی اضافه یا حذف می‌شه، منوی چاپی باید دوباره طراحی و چاپ بشه.",
    solutionTitle: "ویرایش از پنل مدیریت",
    solutionText:
      "تغییرات رو در پنل انجام بده؛ منوی آنلاین بدون نیاز به چاپ دوباره به‌روز می‌شه.",
  },
  {
    id: "prices",
    icon: RefreshCw,
    problemTitle: "قیمت‌های قدیمی و ناهماهنگ",
    problemText:
      "وقتی نسخه‌های مختلفی از منو در دسترسه، نگه داشتن قیمت‌ها به‌روز سخت می‌شه.",
    solutionTitle: "یک منوی مرجع",
    solutionText:
      "قیمت‌ها و وضعیت محصولات در یک جا نگهداری می‌شه و مشتری همیشه همون منوی جاری رو می‌بینه.",
  },
  {
    id: "management",
    icon: Layers,
    problemTitle: "مدیریت پراکنده محصولات",
    problemText:
      "اطلاعات محصولات، تصویرها و دسته‌بندی‌ها اغلب جاهای مختلفی نگهداری می‌شن.",
    solutionTitle: "مدیریت متمرکز",
    solutionText:
      "محصولات، دسته‌بندی‌ها، تصویرها و قیمت‌ها رو در پنل مدیریت کنار هم نگه دار.",
  },
  {
    id: "sharing",
    icon: Link2,
    problemTitle: "دسترسی‌دادن به منو برای مشتری",
    problemText:
      "رساندن منو به دست مشتری، به‌خصوص با منوی کاغذی، همیشه ساده و سریع نیست.",
    solutionTitle: "لینک و QR Code",
    solutionText:
      "مشتری با اسکن QR Code یا باز کردن یک لینک، منو رو در مرورگر موبایلش می‌بینه.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Features                                                                  */
/* -------------------------------------------------------------------------- */

export const features: Feature[] = [
  {
    id: "digital-menu",
    title: "منوی دیجیتال",
    description:
      "منوی کسب‌وکارت با یک لینک در مرورگر موبایل مشتری باز می‌شه؛ بدون نیاز به نصب اپلیکیشن.",
    icon: Smartphone,
    enabled: true,
  },
  {
    id: "products",
    title: "مدیریت محصولات",
    description:
      "نام، تصویر، قیمت و وضعیت موجودی محصولات رو از یک جا مدیریت کن.",
    icon: Package,
    enabled: true,
  },
  {
    id: "categories",
    title: "مدیریت دسته‌بندی‌ها",
    description:
      "محصولات رو در دسته‌بندی‌های مرتب سازمان بده تا مشتری راحت‌تر پیداشون کنه.",
    icon: FolderTree,
    enabled: true,
  },
  {
    id: "templates",
    title: "قالب‌های منو",
    description:
      "از بین قالب‌های موجود، ظاهر مناسب فضا و هویت کسب‌وکارت رو انتخاب کن.",
    icon: LayoutTemplate,
    enabled: true,
  },
  {
    // TODO: set to false if table-specific QR codes are not live yet.
    id: "table-qr",
    title: "QR Code اختصاصی میزها",
    description:
      "برای هر میز می‌تونی QR Code جداگانه داشته باشی؛ در صورت فعال بودن این امکان برای کسب‌وکارت.",
    icon: QrCode,
    enabled: true,
  },
  {
    id: "orders",
    title: "مدیریت سفارش‌ها",
    description: "سفارش‌ها رو در پنل مدیریت ببین و پیگیری کن.",
    icon: ClipboardList,
    enabled: true,
  },
  {
    id: "dashboard",
    title: "پنل مدیریت",
    description:
      "همه بخش‌های منو رو از یک پنل ساده و منظم کنترل کن و تغییرات رو سریع اعمال کن.",
    icon: LayoutDashboard,
    enabled: true,
  },
  {
    // TODO: set to false if reports are not available in production yet.
    id: "reports",
    title: "گزارش‌های پایه",
    description:
      "با گزارش‌های پایه، تصویر کلی‌تری از وضعیت کسب‌وکارت داشته باش.",
    icon: BarChart3,
    enabled: true,
  },
];

/* -------------------------------------------------------------------------- */
/*  Menu templates                                                            */
/* -------------------------------------------------------------------------- */

/**
 * TODO: Replace with the real template names / IDs. Each entry gets a labelled
 * screenshot placeholder until you swap in a real local image.
 */
export const menuTemplates: MenuTemplate[] = [
  {
    id: "Template001",
    name: "قالب ۰۰۱",
    description: "TODO: توضیح کوتاه ظاهر و کاربرد این قالب را اینجا وارد کن.",
  },
  {
    id: "Template002",
    name: "قالب ۰۰۲",
    description: "TODO: توضیح کوتاه ظاهر و کاربرد این قالب را اینجا وارد کن.",
  },
];

/* -------------------------------------------------------------------------- */
/*  How it works                                                              */
/* -------------------------------------------------------------------------- */

export const steps: Step[] = [
  {
    id: "request",
    title: "درخواست راه‌اندازی",
    description:
      "درخواستت رو برای تیم منو لاژو ارسال کن. ثبت‌نام عمومی وجود نداره و حساب کسب‌وکار توسط تیم ساخته می‌شه.",
  },
  {
    id: "prepare",
    title: "آماده‌سازی منو",
    description:
      "محصولات، دسته‌بندی‌ها، قیمت‌ها و تصویرها آماده و در پنل مدیریت کسب‌وکارت ثبت می‌شن.",
  },
  {
    id: "template",
    title: "انتخاب قالب",
    description:
      "یکی از قالب‌های موجود رو برای نمایش منو به مشتری‌ها انتخاب کن.",
  },
  {
    id: "publish",
    title: "انتشار لینک و استفاده از QR Code",
    description: "لینک منو رو منتشر کن و QR Code رو در دسترس مشتری‌هات بگذار.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Dashboard preview                                                         */
/* -------------------------------------------------------------------------- */

export const dashboardShots: DashboardShot[] = [
  {
    id: "overview",
    label: "جایگاه اسکرین‌شات پنل مدیریت",
    description: "نمای کلی داشبورد",
    icon: LayoutDashboard,
    enabled: true,
  },
  {
    id: "products",
    label: "جایگاه اسکرین‌شات مدیریت محصولات",
    description: "لیست و ویرایش محصولات",
    icon: Package,
    enabled: true,
  },
  {
    id: "categories",
    label: "جایگاه اسکرین‌شات مدیریت دسته‌بندی‌ها",
    description: "ساخت و مرتب‌سازی دسته‌بندی‌ها",
    icon: FolderTree,
    enabled: true,
  },
  {
    id: "orders",
    label: "جایگاه اسکرین‌شات سفارش‌ها",
    description: "مشاهده و پیگیری سفارش‌ها",
    icon: ClipboardList,
    enabled: true,
  },
  {
    // TODO: set to false if reports are not available yet.
    id: "reports",
    label: "جایگاه اسکرین‌شات گزارش‌ها",
    description: "گزارش‌های پایه",
    icon: BarChart3,
    enabled: true,
  },
];

/* -------------------------------------------------------------------------- */
/*  Target businesses                                                         */
/* -------------------------------------------------------------------------- */

export const businesses: Business[] = [
  {
    id: "cafe",
    title: "کافه‌ها",
    description: "منوی نوشیدنی‌ها و دسرها رو مرتب و همیشه به‌روز نشون بده.",
    icon: Coffee,
  },
  {
    id: "restaurant",
    title: "رستوران‌ها",
    description: "غذاها رو در دسته‌بندی‌های واضح به مشتری معرفی کن.",
    icon: UtensilsCrossed,
  },
  {
    id: "fastfood",
    title: "فست‌فودها",
    description:
      "با منویی که تغییر قیمت و محصول رو سریع نشون می‌ده، هماهنگ بمون.",
    icon: Sandwich,
  },
  {
    id: "juice-icecream",
    title: "آبمیوه و بستنی‌فروشی‌ها",
    description: "طعم‌ها و محصولات فصلی رو راحت به‌روزرسانی کن.",
    icon: CupSoda,
  },
];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

export const faqs: FaqItem[] = [
  {
    id: "what",
    question: "منو لاژو چیه؟",
    answer:
      "منو لاژو یک پلتفرم منوی دیجیتاله. کسب‌وکارها می‌تونن منوی خودشون رو در پنل مدیریت کنن و با یک لینک یا QR Code در اختیار مشتری‌ها بذارن.",
  },
  {
    id: "setup",
    question: "چطور منوی دیجیتال راه‌اندازی کنم؟",
    answer:
      "درخواست راه‌اندازی رو برای تیم منو لاژو ارسال کن. در حال حاضر ثبت‌نام عمومی وجود نداره و حساب کسب‌وکار توسط تیم پلتفرم ساخته می‌شه. بعد از اون منو آماده، قالب انتخاب و لینک منتشر می‌شه.",
  },
  {
    id: "app",
    question: "آیا مشتری به نصب اپلیکیشن نیاز داره؟",
    answer:
      "نه. مشتری منو رو از طریق لینک یا QR Code در مرورگر گوشیش باز می‌کنه و نیازی به نصب اپلیکیشن نیست.",
  },
  {
    id: "edit",
    question: "چطور محصولات و قیمت‌ها رو تغییر بدم؟",
    answer:
      "محصولات، دسته‌بندی‌ها، تصویرها، قیمت‌ها و وضعیت موجودی رو از پنل مدیریت ویرایش می‌کنی و منوی آنلاین با همون اطلاعات جدید نمایش داده می‌شه.",
  },
  {
    id: "table-qr",
    question: "آیا برای هر میز QR Code جداگانه می‌تونم داشته باشم؟",
    answer:
      "QR Code اختصاصی میزها پشتیبانی می‌شه. برای جزئیات و فعال‌سازیش برای کسب‌وکارت، با تیم منو لاژو در ارتباط باش.",
  },
  {
    id: "orders",
    question: "آیا مشتری می‌تونه سفارش ثبت کنه؟",
    answer:
      "مدیریت سفارش‌ها بخشی از پنل مدیریته. نحوه ثبت سفارش توسط مشتری به پیکربندی منوی هر کسب‌وکار بستگی داره؛ برای اطلاع دقیق از شرایط کسب‌وکارت با تیم منو لاژو صحبت کن.",
  },
  {
    id: "payment",
    question: "پرداخت سفارش‌ها چطور انجام می‌شه؟",
    answer:
      "در حال حاضر پرداخت آنلاین وجود نداره. مشتری‌ها هزینه سفارش رو در صندوق پرداخت می‌کنن.",
  },
  {
    id: "change-template",
    question: "آیا می‌تونم قالب منو رو تغییر بدم؟",
    answer:
      "چند قالب برای منو وجود داره و انتخاب قالب بخشی از مراحل راه‌اندازیه. برای تغییر قالب بعد از انتشار منو، با تیم منو لاژو هماهنگ کن.",
  },
  {
    id: "contact",
    question: "چطور با تیم منو لاژو تماس بگیرم؟",
    answer:
      "راه‌های ارتباطی در بخش «تماس با ما» در پایین همین صفحه آورده می‌شه. می‌تونی از همون‌جا درخواست راه‌اندازی هم بدی.",
  },
];
