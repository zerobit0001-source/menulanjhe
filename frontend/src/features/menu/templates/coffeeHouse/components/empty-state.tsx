import { Coffee } from "lucide-react";

interface Props {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: Props) {
  return (
    <div className="ch-empty" role="status">
      <Coffee />
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {actionLabel && onAction && (
        <button type="button" className="ch-btn" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
