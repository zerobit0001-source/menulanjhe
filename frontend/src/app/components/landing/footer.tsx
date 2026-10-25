import { Link2, Mail, Phone, UtensilsCrossed } from "lucide-react";
import { navLinks, siteConfig, type ContactPoint } from "@/config/landing";
import { Container, focusRing } from "./ui";

const contactIcons: Record<ContactPoint["kind"], typeof Phone> = {
  phone: Phone,
  email: Mail,
  link: Link2,
};

export function Footer() {
  const year = new Date().toLocaleDateString("fa-IR", { year: "numeric" });

  return (
    <footer className="border-t border-stone-200 bg-white pt-16">
      <Container>
        <div className="grid gap-10 pb-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white"
              >
                <UtensilsCrossed className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold text-stone-900">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-8 text-stone-600">
              {siteConfig.description}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="پیوندهای فوتر">
            <h2 className="text-sm font-bold text-stone-900">دسترسی سریع</h2>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`rounded text-sm text-stone-600 hover:text-stone-900 ${focusRing}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div id="contact-info" className="ml-section">
            <h2 className="text-sm font-bold text-stone-900">تماس با ما</h2>

            {siteConfig.contacts.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {siteConfig.contacts.map((contact) => {
                  const Icon = contactIcons[contact.kind];
                  const external = /^https?:\/\//.test(contact.href);
                  return (
                    <li key={contact.id}>
                      <a
                        href={contact.href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className={`flex items-center gap-2 rounded text-sm text-stone-600 hover:text-stone-900 ${focusRing}`}
                      >
                        <Icon
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-teal-700"
                        />
                        <span>{contact.label}:</span>
                        <span dir="ltr" className="text-stone-800">
                          {contact.value}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4 text-sm leading-7 text-stone-500">
                راه‌های ارتباطی هنوز تنظیم نشده‌اند. اطلاعات واقعی رو در
                <span dir="ltr" className="mx-1 font-mono text-xs">
                  src/config/landing.ts
                </span>
                (بخش contacts) وارد کن.
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-stone-200 py-6 text-center text-xs text-stone-500">
          © {year} {siteConfig.name}. تمامی حقوق محفوظ است.
        </div>
      </Container>
    </footer>
  );
}

