"use client";
import { Coffee } from "lucide-react";
import { useState } from "react";

export function ProductImage({
  src,
  alt,
}: {
  src?: string | null;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <Coffee width={32} height={32} />;
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
  );
}
