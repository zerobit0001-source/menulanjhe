"use client";
import { useState, type FormEvent } from "react";
import { formatPrice, type CartLine, type CheckoutInput } from "../adapter";
import { EmptyState } from "./empty-state";
import { ArrowRight } from "lucide-react";

interface Props {
  lines: CartLine[];
  total: number;
  isSubmitting: boolean;
  error: string | null;
  onBack: () => void;
  onSubmit: (input: CheckoutInput) => void;
}

export function CheckoutView({
  lines,
  total,
  isSubmitting,
  error,
  onBack,
  onSubmit,
}: Props) {
  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");

  const handle = (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting || lines.length === 0) return;
    onSubmit({
      customerName: customerName.trim() || undefined,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="ch-container">
      <div className="ch-page">
        <button
          type="button"
          className="ch-btn ch-btn--ghost"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <ArrowRight width={16} height={16} /> بازگشت به منو
        </button>
        <h1 style={{ margin: "18px 0 14px", fontSize: "1.4rem" }}>ثبت سفارش</h1>

        {lines.length === 0 ? (
          <EmptyState
            title="سبد شما خالی است"
            actionLabel="بازگشت به منو"
            onAction={onBack}
          />
        ) : (
          <form className="ch-form" onSubmit={handle} noValidate>
            <section className="ch-panel" aria-label="خلاصه سفارش">
              <h2>سفارش شما</h2>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "grid",
                  gap: 8,
                }}
              >
                {lines.map(({ product, quantity }) => (
                  <li key={product.id} className="ch-receipt__item">
                    <span>
                      {product.name} ×{" "}
                      {new Intl.NumberFormat("fa-IR").format(quantity)}
                    </span>
                    <span>{formatPrice(product.price * quantity)}</span>
                  </li>
                ))}
              </ul>
              <hr
                style={{
                  border: 0,
                  borderTop: "1px solid var(--ch-line)",
                  margin: "12px 0",
                }}
              />
              <div className="ch-total">
                <span>جمع</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 12, opacity: 0.7 }}>
                مبلغ نهایی پس از ثبت، توسط سیستم تأیید می‌شود.
              </p>
            </section>

            <section className="ch-panel">
              <h2>اطلاعات (اختیاری)</h2>
              <div className="ch-form">
                <label className="ch-label">
                  نام
                  <input
                    className="ch-input"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    autoComplete="name"
                    disabled={isSubmitting}
                  />
                </label>
                <label className="ch-label">
                  توضیحات سفارش
                  <textarea
                    className="ch-input"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={isSubmitting}
                  />
                </label>
              </div>
            </section>

            {error && (
              <div className="ch-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="ch-btn ch-btn--block text-white!"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "در حال ثبت سفارش…" : "ثبت سفارش"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
