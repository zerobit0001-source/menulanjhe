"use client";

/**
 * Menu Lanjhe — Public Menu Template009 ("Sage & Paper")
 *
 * Visual direction: warm paper background, deep olive primary, terracotta accent,
 * large rounded food photography, editorial section headings. Persian RTL, Vazirmatn.
 *
 * ASSUMPTIONS TO VERIFY AGAINST THE REAL PROJECT (marked with ASSUMPTION):
 *  - type import path / shapes of CartItem and MenuOrder
 *  - hook return shapes (taken from the integration spec)
 *  - currency label
 */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  InputBase,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import { useMenuSearch } from "@/features/menu/hooks/useMenuSearch";
import { useMenuCart } from "@/features/menu/hooks/useMenuCart";
import { useMenuOrder } from "@/features/menu/hooks/useMenuOrder";
// ASSUMPTION: shared types live here; use the project's real path/names.
import type {
  Menu,
  MenuProduct,
  CartItem,
  MenuOrder,
} from "@/features/menu/types";
import {
  ArrowRight,
  Check,
  ClosedCaptionIcon,
  Minus,
  Plus,
  SearchCheckIcon,
  ShoppingBag,
  Trash,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const t = {
  bg: "#F6F1E7",
  surface: "#FFFFFF",
  ink: "#23261F",
  muted: "#757A6C",
  line: "#E4DDCC",
  primary: "#3F4F32",
  primarySoft: "#E5EAD9",
  accent: "#C2603A",
  radius: { sm: "12px", md: "20px", lg: "28px" },
  shadow: "0 6px 24px rgba(63, 79, 50, 0.08)",
  font: "var(--font-vazirmatn), Vazirmatn, system-ui, sans-serif",
};

// ASSUMPTION: currency label; replace with the project's formatter if one exists.
const CURRENCY_LABEL = "تومان";
const formatPrice = (n: number) =>
  `${n.toLocaleString("fa-IR")} ${CURRENCY_LABEL}`;

const focusRing = {
  "&:focus-visible": { outline: `3px solid ${t.accent}`, outlineOffset: 2 },
};

const reduceMotion = {
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none !important",
    animation: "none !important",
  },
};

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

type QtyControlProps = {
  quantity: number;
  name: string;
  onIncrease: () => void;
  onDecrease: () => void;
};

function QtyControl({
  quantity,
  name,
  onIncrease,
  onDecrease,
}: QtyControlProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        bgcolor: t.primary,
        color: "#fff",
        borderRadius: 99,
        p: 0.25,
      }}
    >
      <IconButton
        size="small"
        aria-label={`افزودن ${name}`}
        onClick={onIncrease}
        sx={{ color: "#fff", ...focusRing }}
      >
        <Plus fontSize="small" />
      </IconButton>
      <Typography
        component="span"
        aria-live="polite"
        sx={{
          minWidth: 22,
          textAlign: "center",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {quantity.toLocaleString("fa-IR")}
      </Typography>
      <IconButton
        size="small"
        aria-label={`کاهش ${name}`}
        onClick={onDecrease}
        sx={{ color: "#fff", ...focusRing }}
      >
        {quantity === 1 ? (
          <Trash fontSize="small" />
        ) : (
          <Minus fontSize="small" />
        )}
      </IconButton>
    </Box>
  );
}

type ProductActions = {
  quantities: Record<string, number>;
  addProduct: (id: string) => void;
  increaseProduct: (id: string) => void;
  decreaseProduct: (id: string) => void;
};

function ProductAction({
  product,
  quantities,
  addProduct,
  increaseProduct,
  decreaseProduct,
}: { product: MenuProduct } & ProductActions) {
  const qty = quantities[product.id] ?? 0;

  if (!product.available) {
    return (
      <Typography sx={{ fontSize: 12, color: t.muted, fontWeight: 600 }}>
        ناموجود
      </Typography>
    );
  }
  if (qty > 0) {
    return (
      <QtyControl
        quantity={qty}
        name={product.name}
        onIncrease={() => increaseProduct(product.id)}
        onDecrease={() => decreaseProduct(product.id)}
      />
    );
  }
  return (
    <IconButton
      aria-label={`افزودن ${product.name} به سبد`}
      onClick={() => addProduct(product.id)}
      sx={{
        bgcolor: t.primarySoft,
        color: t.primary,
        "&:hover": { bgcolor: t.primary, color: "#fff" },
        transition: "background-color .2s, color .2s",
        ...reduceMotion,
        ...focusRing,
      }}
    >
      <Plus />
    </IconButton>
  );
}

function ProductImage({
  src,
  alt,
  size,
  radius,
  dimmed,
}: {
  src?: string | null;
  alt: string;
  size: number | string;
  radius: string;
  dimmed?: boolean;
}) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: radius,
        overflow: "hidden",
        bgcolor: t.primarySoft,
        opacity: dimmed ? 0.5 : 1,
        filter: dimmed ? "grayscale(1)" : "none",
      }}
    >
      {src ? (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : null}
    </Box>
  );
}

/* Horizontal row card (regular category list) */
function ProductRow({
  product,
  ...actions
}: { product: MenuProduct } & ProductActions) {
  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        gap: 1.75,
        p: 1.5,
        bgcolor: t.surface,
        borderRadius: t.radius.md,
        border: `1px solid ${t.line}`,
        boxShadow: t.shadow,
      }}
    >
      <ProductImage
        src={product.image}
        alt={product.name}
        size={104}
        radius={t.radius.sm}
        dimmed={!product.available}
      />
      <Box
        sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,
            color: product.available ? t.ink : t.muted,
            overflowWrap: "anywhere",
          }}
        >
          {product.name}
        </Typography>
        {product.description ? (
          <Typography
            sx={{
              mt: 0.5,
              fontSize: 13,
              lineHeight: 1.7,
              color: t.muted,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </Typography>
        ) : null}
        <Box
          sx={{
            mt: "auto",
            pt: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: 15, color: t.accent }}>
            {formatPrice(product.price)}
          </Typography>
          <ProductAction product={product} {...actions} />
        </Box>
      </Box>
    </Box>
  );
}

/* Vertical card (quick-section carousel) */
function ProductTile({
  product,
  ...actions
}: { product: MenuProduct } & ProductActions) {
  return (
    <Box
      component="article"
      sx={{
        width: 180,
        flexShrink: 0,
        scrollSnapAlign: "start",
        bgcolor: t.surface,
        borderRadius: t.radius.md,
        border: `1px solid ${t.line}`,
        boxShadow: t.shadow,
        p: 1.25,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <ProductImage
        src={product.image}
        alt={product.name}
        size="100%"
        radius={t.radius.sm}
        dimmed={!product.available}
      />
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 14,
          overflowWrap: "anywhere",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: 40,
        }}
      >
        {product.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: 13, color: t.accent }}>
          {formatPrice(product.price)}
        </Typography>
        <ProductAction product={product} {...actions} />
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Checkout view                                                       */
/* ------------------------------------------------------------------ */

type CheckoutProps = {
  items: CartItem[];
  total: number;
  qrToken: string;
  onBack: () => void;
  onSuccess: (order: MenuOrder) => void;
};

function Checkout({ items, total, qrToken, onBack, onSuccess }: CheckoutProps) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const { submitOrder, error, isLoading } = useMenuOrder();

  const handleSubmit = async () => {
    if (isLoading) return;
    const result = await submitOrder({ items, qrToken, name, notes });
    if (!result) return;
    onSuccess(result);
  };

  return (
    <Box sx={{ maxWidth: 560, mx: "auto", px: 2, pt: 2, pb: 6 }}>
      <Button
        onClick={onBack}
        startIcon={<ArrowRight />}
        sx={{ color: t.primary, fontWeight: 700, mb: 1, ...focusRing }}
      >
        بازگشت به منو
      </Button>
      <Typography component="h1" sx={{ fontSize: 26, fontWeight: 800, mb: 2 }}>
        بررسی و ثبت سفارش
      </Typography>

      <Box
        sx={{
          bgcolor: t.surface,
          borderRadius: t.radius.md,
          border: `1px solid ${t.line}`,
          p: 2,
          mb: 2,
        }}
      >
        {items.map((item) => (
          <Box
            // ASSUMPTION: CartItem = { product: MenuProduct; quantity: number }
            key={item.product.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              py: 1,
              borderBottom: `1px dashed ${t.line}`,
              "&:last-of-type": { borderBottom: 0 },
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>
              {item.product.name}
              <Typography component="span" sx={{ color: t.muted, mx: 1 }}>
                ×{item.quantity.toLocaleString("fa-IR")}
              </Typography>
            </Typography>
            <Typography sx={{ color: t.muted, whiteSpace: "nowrap" }}>
              {formatPrice(item.product.price * item.quantity)}
            </Typography>
          </Box>
        ))}
        <Box
          sx={{
            mt: 1.5,
            pt: 1.5,
            borderTop: `2px solid ${t.ink}`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: 800 }}>جمع کل</Typography>
          <Typography sx={{ fontWeight: 800, color: t.accent }}>
            {formatPrice(total)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "grid", gap: 2, mb: 2 }}>
        <TextField
          label="نام (اختیاری)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          fullWidth
        />
        <TextField
          label="توضیحات سفارش (اختیاری)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={isLoading}
          multiline
          minRows={3}
          fullWidth
        />
      </Box>

      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {String(error)}
        </Alert>
      ) : null}

      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={handleSubmit}
        disabled={isLoading || items.length === 0}
        sx={{
          bgcolor: t.primary,
          borderRadius: 99,
          py: 1.5,
          fontWeight: 800,
          fontSize: 16,
          boxShadow: "none",
          "&:hover": { bgcolor: "#32402A", boxShadow: "none" },
          ...focusRing,
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "ثبت سفارش"
        )}
      </Button>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Success view                                                        */
/* ------------------------------------------------------------------ */

type SuccessProps = { orderId: string; total: number; onBack: () => void };

function Success({ orderId, total, onBack }: SuccessProps) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      <Box sx={{ maxWidth: 420 }} role="status">
        <Box
          sx={{
            width: 88,
            height: 88,
            mx: "auto",
            mb: 3,
            borderRadius: "50%",
            bgcolor: t.primary,
            color: "#fff",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Check sx={{ fontSize: 48 }} />
        </Box>
        <Typography component="h1" sx={{ fontSize: 26, fontWeight: 800 }}>
          سفارش شما ثبت شد
        </Typography>
        <Box
          sx={{
            mt: 3,
            p: 2.5,
            bgcolor: t.surface,
            border: `1px solid ${t.line}`,
            borderRadius: t.radius.md,
            display: "grid",
            gap: 1,
          }}
        >
          <Row label="شماره سفارش" value={orderId} />
          <Row label="مبلغ کل" value={formatPrice(total)} />
        </Box>
        <Button
          onClick={onBack}
          sx={{ mt: 3, color: t.primary, fontWeight: 800, ...focusRing }}
        >
          بازگشت به منو
        </Button>
      </Box>
    </Box>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
      <Typography sx={{ color: t.muted }}>{label}</Typography>
      <Typography sx={{ fontWeight: 800 }}>{value}</Typography>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Main template                                                       */
/* ------------------------------------------------------------------ */

export type MenuTemplateProps = { menu: Menu; qrToken: string };

export default function Template009({ menu, qrToken }: MenuTemplateProps) {
  const [view, setView] = useState<"menu" | "checkout" | "success">("menu");
  const [order, setOrder] = useState<MenuOrder | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const {
    search,
    setSearch,
    clearSearch,
    isSearching,
    filteredCategories,
    searchResultCount,
  } = useMenuSearch(menu.categories);

  // Cart must resolve products from categories AND quick sections (deduped by id).
  const allProducts = useMemo(() => {
    const map = new Map<string, MenuProduct>();
    menu.categories.forEach((c) => c.products.forEach((p) => map.set(p.id, p)));
    menu.quickSections.forEach((s) =>
      s.products.forEach((p) => map.set(p.id, p)),
    );
    return Array.from(map.values());
  }, [menu]);

  const cart = useMenuCart(allProducts);
  const actions: ProductActions = {
    quantities: cart.quantities,
    addProduct: cart.addProduct,
    increaseProduct: cart.increaseProduct,
    decreaseProduct: cart.decreaseProduct,
  };

  const visibleCategories = filteredCategories.filter(
    (c) => c.products.length > 0,
  );
  const quickSections = menu.quickSections.filter((s) => s.products.length > 0);

  /* Track current category while scrolling (no scroll listeners). */
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    if (view !== "menu" || isSearching) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActiveCategory(hit.target.getAttribute("data-cat"));
      },
      { rootMargin: "-120px 0px -65% 0px" },
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [view, isSearching, visibleCategories.length]);

  const scrollToCategory = (id: string) => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    sectionRefs.current[id]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    setActiveCategory(id);
  };

  const handleSuccess = (result: MenuOrder) => {
    setOrder(result);
    cart.clearCart();
    setCartOpen(false);
    setView("success");
    window.scrollTo({ top: 0 });
  };

  const rootSx = {
    direction: "rtl" as const,
    minHeight: "100dvh",
    bgcolor: t.bg,
    color: t.ink,
    fontFamily: t.font,
    "& *": { fontFamily: "inherit" },
  };

  if (view === "checkout") {
    return (
      <Box sx={rootSx}>
        <Checkout
          items={cart.cartItems}
          total={cart.cartTotal}
          qrToken={qrToken}
          onBack={() => setView("menu")}
          onSuccess={handleSuccess}
        />
      </Box>
    );
  }

  if (view === "success" && order) {
    return (
      <Box sx={rootSx}>
        {/* ASSUMPTION: MenuOrder exposes id + total; map via the project's real fields. */}
        <Success
          orderId={String(order.id)}
          total={order.total}
          onBack={() => setView("menu")}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ ...rootSx, pb: cart.cartCount > 0 ? 12 : 4 }}>
      {/* Hero */}
      <Box
        component="header"
        sx={{
          px: 2.5,
          pt: 5,
          pb: 3,
          maxWidth: 720,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "18px",
            bgcolor: t.primary,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
            fontSize: 24,
            mb: 2,
          }}
          aria-hidden
        >
          {menu.shop.name.trim().charAt(0)}
        </Box>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: 32, sm: 40 },
            fontWeight: 800,
            lineHeight: 1.3,
          }}
        >
          {menu.shop.name}
        </Typography>
        {menu.shop.description ? (
          <Typography sx={{ mt: 1, color: t.muted, lineHeight: 1.9 }}>
            {menu.shop.description}
          </Typography>
        ) : null}
      </Box>

      {/* Sticky: search + category chips */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: "rgba(246, 241, 231, 0.96)",
          borderBottom: `1px solid ${t.line}`,
          py: 1.25,
        }}
      >
        <Box sx={{ maxWidth: 720, mx: "auto", px: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: t.surface,
              border: `1px solid ${t.line}`,
              borderRadius: 99,
              px: 1.5,
              "&:focus-within": {
                borderColor: t.primary,
                boxShadow: `0 0 0 3px ${t.primarySoft}`,
              },
            }}
          >
            <SearchCheckIcon sx={{ color: t.muted }} />
            <InputBase
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی غذا یا نوشیدنی…"
              inputProps={{ "aria-label": "جستجو در منو" }}
              sx={{ flex: 1, py: 0.75, fontSize: 15 }}
            />
            {isSearching ? (
              <IconButton
                size="small"
                aria-label="پاک کردن جستجو"
                onClick={clearSearch}
                sx={focusRing}
              >
                <ClosedCaptionIcon fontSize="small" />
              </IconButton>
            ) : null}
          </Box>

          {!isSearching && visibleCategories.length > 1 ? (
            <Box
              component="nav"
              aria-label="دسته‌بندی منو"
              sx={{
                mt: 1.25,
                display: "flex",
                gap: 1,
                overflowX: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {visibleCategories.map((c) => {
                const active = activeCategory === c.id;
                return (
                  <Button
                    key={c.id}
                    onClick={() => scrollToCategory(c.id)}
                    aria-current={active ? "true" : undefined}
                    sx={{
                      flexShrink: 0,
                      borderRadius: 99,
                      px: 2,
                      py: 0.5,
                      fontWeight: 700,
                      fontSize: 14,
                      whiteSpace: "nowrap",
                      bgcolor: active ? t.primary : "transparent",
                      color: active ? "#fff" : t.ink,
                      border: `1px solid ${active ? t.primary : t.line}`,
                      transition: "background-color .2s, color .2s",
                      "&:hover": {
                        bgcolor: active ? t.primary : t.primarySoft,
                      },
                      ...reduceMotion,
                      ...focusRing,
                    }}
                  >
                    {c.name}
                  </Button>
                );
              })}
            </Box>
          ) : null}
        </Box>
      </Box>

      <Box component="main" sx={{ maxWidth: 720, mx: "auto", px: 2, pt: 3 }}>
        {/* Search status / empty state */}
        {isSearching ? (
          <Typography
            role="status"
            sx={{ color: t.muted, mb: 2, fontSize: 14 }}
          >
            {searchResultCount.toLocaleString("fa-IR")} نتیجه برای «{search}»
          </Typography>
        ) : null}

        {isSearching && searchResultCount === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
              موردی پیدا نشد
            </Typography>
            <Typography sx={{ color: t.muted, mt: 1, mb: 2 }}>
              عبارت دیگری را جستجو کنید.
            </Typography>
            <Button
              onClick={clearSearch}
              sx={{ color: t.primary, fontWeight: 700 }}
            >
              پاک کردن جستجو
            </Button>
          </Box>
        ) : null}

        {/* Quick sections (hook does not search these, so hide while searching) */}
        {!isSearching &&
          quickSections.map((s) => (
            <Box
              component="section"
              key={s.id}
              aria-label={s.title}
              sx={{ mb: 4 }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: 20,
                  fontWeight: 800,
                  mb: 1.5,
                  color: s.type === "discount" ? t.accent : t.ink,
                }}
              >
                {s.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  overflowX: "auto",
                  scrollSnapType: "x proximity",
                  pb: 1.5,
                  mx: -2,
                  px: 2,
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {s.products.map((p) => (
                  <ProductTile key={p.id} product={p} {...actions} />
                ))}
              </Box>
            </Box>
          ))}

        {/* Categories */}
        {visibleCategories.map((c) => (
          <Box
            component="section"
            key={c.id}
            data-cat={c.id}
            ref={(el: HTMLElement | null) => {
              sectionRefs.current[c.id] = el;
            }}
            sx={{ mb: 4, scrollMarginTop: 130 }}
          >
            <Typography
              component="h2"
              sx={{ fontSize: 22, fontWeight: 800, mb: 1.5 }}
            >
              {c.name}
            </Typography>
            <Box sx={{ display: "grid", gap: 1.5 }}>
              {c.products.map((p) => (
                <ProductRow key={p.id} product={p} {...actions} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Floating cart bar */}
      {cart.cartCount > 0 ? (
        <Box
          sx={{
            position: "fixed",
            insetInline: 0,
            bottom: 0,
            zIndex: 20,
            p: 2,
            pb: "calc(16px + env(safe-area-inset-bottom))",
            pointerEvents: "none",
          }}
        >
          <Button
            onClick={() => setCartOpen(true)}
            aria-label={`مشاهده سبد خرید، ${cart.cartCount} مورد`}
            sx={{
              pointerEvents: "auto",
              display: "flex",
              maxWidth: 560,
              mx: "auto",
              width: "100%",
              justifyContent: "space-between",
              bgcolor: t.primary,
              color: "#fff",
              borderRadius: 99,
              px: 2.5,
              py: 1.5,
              boxShadow: "0 10px 30px rgba(35, 38, 31, 0.3)",
              "&:hover": { bgcolor: "#32402A" },
              ...focusRing,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <ShoppingBag />
              <Typography sx={{ fontWeight: 700 }}>
                سبد خرید ({cart.cartCount.toLocaleString("fa-IR")})
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 800 }}>
              {formatPrice(cart.cartTotal)}
            </Typography>
          </Button>
        </Box>
      ) : null}

      {/* Cart drawer */}
      <Drawer
        anchor="bottom"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        PaperProps={{
          sx: {
            direction: "rtl",
            bgcolor: t.bg,
            borderTopLeftRadius: t.radius.lg,
            borderTopRightRadius: t.radius.lg,
            maxHeight: "85dvh",
            maxWidth: 560,
            mx: "auto",
            fontFamily: t.font,
          },
        }}
      >
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography component="h2" sx={{ fontSize: 20, fontWeight: 800 }}>
              سبد خرید
            </Typography>
            <Box>
              {cart.cartItems.length > 0 ? (
                <Button
                  size="small"
                  onClick={cart.clearCart}
                  sx={{ color: t.accent, fontWeight: 700 }}
                >
                  خالی کردن
                </Button>
              ) : null}
              <IconButton
                aria-label="بستن سبد"
                onClick={() => setCartOpen(false)}
                sx={focusRing}
              >
                <ClosedCaptionIcon />
              </IconButton>
            </Box>
          </Box>

          {cart.cartItems.length === 0 ? (
            <Typography sx={{ color: t.muted, textAlign: "center", py: 4 }}>
              سبد خرید شما خالی است.
            </Typography>
          ) : (
            <>
              <Box sx={{ overflowY: "auto", display: "grid", gap: 1.5 }}>
                {cart.cartItems.map((item) => (
                  <Box
                    key={item.product.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      bgcolor: t.surface,
                      border: `1px solid ${t.line}`,
                      borderRadius: t.radius.md,
                      p: 1.25,
                    }}
                  >
                    <ProductImage
                      src={item.product.image}
                      alt={item.product.name}
                      size={56}
                      radius={t.radius.sm}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {item.product.name}
                      </Typography>
                      <Typography
                        sx={{ color: t.accent, fontWeight: 700, fontSize: 13 }}
                      >
                        {formatPrice(item.product.price * item.quantity)}
                      </Typography>
                    </Box>
                    <QtyControl
                      quantity={item.quantity}
                      name={item.product.name}
                      onIncrease={() => cart.increaseProduct(item.product.id)}
                      onDecrease={() => cart.decreaseProduct(item.product.id)}
                    />
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: 800 }}>جمع کل</Typography>
                <Typography
                  sx={{ fontWeight: 800, color: t.accent, fontSize: 18 }}
                >
                  {formatPrice(cart.cartTotal)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                disabled={cart.cartItems.length === 0}
                onClick={() => {
                  setCartOpen(false);
                  setView("checkout");
                  window.scrollTo({ top: 0 });
                }}
                sx={{
                  bgcolor: t.primary,
                  borderRadius: 99,
                  py: 1.5,
                  fontWeight: 800,
                  fontSize: 16,
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#32402A", boxShadow: "none" },
                  ...focusRing,
                }}
              >
                ادامه و ثبت سفارش
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
