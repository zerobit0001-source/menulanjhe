import { formatPrice, type OrderReceiptData } from "../adapter";

export function OrderReceipt({ receipt }: { receipt: OrderReceiptData }) {
  return (
    <div className="ch-receipt">
      <dl>
        <div className="ch-receipt__row">
          <dt>شناسه سفارش</dt>
          <dd style={{ margin: 0, fontWeight: 800 }}>{receipt.id}</dd>
        </div>
        {receipt.status && (
          <div className="ch-receipt__row">
            <dt>وضعیت</dt>
            <dd style={{ margin: 0 }}>{receipt.status}</dd>
          </div>
        )}
      </dl>

      {receipt.items && receipt.items.length > 0 && (
        <>
          <hr />
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gap: 8,
            }}
          >
            {receipt.items.map((item, i) => (
              <li key={`${item.name}-${i}`} className="ch-receipt__item">
                <span>
                  {item.name} ×{" "}
                  {new Intl.NumberFormat("fa-IR").format(item.quantity)}
                </span>
                {item.lineTotal !== undefined && (
                  <span>{formatPrice(item.lineTotal)}</span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      <hr />
      <div className="ch-total">
        <span>جمع کل</span>
        <span>{formatPrice(receipt.total)}</span>
      </div>
    </div>
  );
}
