"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  BarChart3,
  BetweenVerticalEnd,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  SquareMenu,
  Tags,
  X,
} from "lucide-react";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const menuItems = [
  {
    title: "داشبورد",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "سفارش‌ها",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "محصولات",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "دسته‌بندی‌ها",
    href: "/dashboard/categories",
    icon: Tags,
  },
  {
    title: "میزها",
    href: "/dashboard/tables",
    icon: BetweenVerticalEnd,
  },
  {
    title: "منو",
    href: "/dashboard/menu",
    icon: SquareMenu,
  },
  {
    title: "گزارش‌ها",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
];

type DashboardSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function DashboardSidebar({
  open,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  // جلوگیری از scroll صفحه وقتی Drawer بازه
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // بستن با Escape
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <>
      {/* =====================================================
          Desktop Sidebar
      ====================================================== */}

      <Paper
        component="aside"
        elevation={0}
        square
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },

          width: {
            md: 220,
            lg: 256,
          },

          flexShrink: 0,
          height: "100vh",

          flexDirection: "column",

          borderLeft: 1,
          borderColor: "divider",

          bgcolor: "background.paper",
        }}
      >
        <SidebarContent pathname={pathname} onClose={onClose} />
      </Paper>

      {/* =====================================================
          Mobile Drawer
      ====================================================== */}

      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          position: "fixed",
          inset: 0,

          zIndex: 1400,

          /*
           * مهم:
           * این container همیشه وجود دارد.
           * فقط pointer-events را هنگام بسته بودن قطع می‌کنیم.
           */
          pointerEvents: open ? "auto" : "none",

          visibility: open ? "visible" : "hidden",

          transition: "visibility 220ms ease",
        }}
      >
        {/* =================================================
            Overlay
        ================================================== */}

        <Box
          onClick={onClose}
          sx={{
            position: "absolute",
            inset: 0,

            bgcolor: "rgba(15, 23, 42, 0.35)",

            backdropFilter: "blur(2px)",

            opacity: open ? 1 : 0,

            transition: "opacity 220ms cubic-bezier(.2,.8,.2,1)",

            cursor: "pointer",
          }}
        />

        {/* =================================================
            Drawer
        ================================================== */}

        <Paper
          component="aside"
          elevation={0}
          square
          sx={{
            position: "absolute",

            top: 0,
            left: 0,

            width: "min(82vw, 320px)",
            height: "100vh",

            display: "flex",
            flexDirection: "column",

            bgcolor: "background.paper",

            borderRight: 1,
            borderColor: "divider",

            boxShadow: "12px 0 40px rgba(0, 0, 0, 0.12)",

            transform: open ? "translateX(0)" : "translateX(-100%)",

            transition: "transform 260ms cubic-bezier(.2,.8,.2,1)",

            willChange: "transform",
          }}
        >
          <SidebarContent pathname={pathname} onClose={onClose} mobile />
        </Paper>
      </Box>
    </>
  );
}

type SidebarContentProps = {
  pathname: string;
  onClose: () => void;
  mobile?: boolean;
};

function SidebarContent({
  pathname,
  onClose,
  mobile = false,
}: SidebarContentProps) {
  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* =====================================================
          Logo
      ====================================================== */}

      <Box
        sx={{
          height: 80,

          px: {
            md: 2.5,
            lg: 3,
          },

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          flexShrink: 0,
        }}
      >
        <Typography
          component={Link}
          href="/dashboard"
          onClick={mobile ? onClose : undefined}
          variant="h6"
          sx={{
            color: "text.primary",
            textDecoration: "none",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          Menu Lanjhe
        </Typography>

        {/* Close button */}

        {mobile && (
          <Box
            component="button"
            type="button"
            onClick={onClose}
            aria-label="بستن منو"
            sx={{
              width: 40,
              height: 40,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              border: 0,
              borderRadius: 2,

              bgcolor: "transparent",
              color: "text.secondary",

              cursor: "pointer",

              transition: "background-color 180ms ease, color 180ms ease",

              "&:hover": {
                bgcolor: "action.hover",
                color: "text.primary",
              },
            }}
          >
            <X size={20} />
          </Box>
        )}
      </Box>

      {/* =====================================================
          Navigation
      ====================================================== */}

      <Box
        component="nav"
        sx={{
          flex: 1,

          px: {
            md: 1.5,
            lg: 2,
          },

          py: 2,

          overflowY: "auto",

          overscrollBehavior: "contain",
        }}
      >
        <List disablePadding>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);

            return (
              <ListItemButton
                key={item.href}
                component={Link}
                href={item.href}
                onClick={mobile ? onClose : undefined}
                selected={isActive}
                sx={{
                  minHeight: 44,

                  mb: 0.5,

                  px: {
                    md: 1.5,
                    lg: 2,
                  },

                  borderRadius: 1,

                  "&.Mui-selected": {
                    bgcolor: "action.selected",
                    color: "text.primary",
                  },

                  "&.Mui-selected:hover": {
                    bgcolor: "action.selected",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: {
                      md: 36,
                      lg: 40,
                    },

                    color: isActive ? "text.primary" : "text.secondary",
                  }}
                >
                  <Icon size={19} strokeWidth={1.8} />
                </ListItemIcon>

                <ListItemText
                  primary={item.title}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: 14,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      },
                    },
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* =====================================================
          Settings
      ====================================================== */}

      <Box
        sx={{
          flexShrink: 0,
        }}
      >
        <Divider />

        <Stack
          sx={{
            p: {
              md: 1.5,
              lg: 2,
            },
          }}
        >
          <ListItemButton
            component={Link}
            href="/dashboard/settings"
            onClick={mobile ? onClose : undefined}
            selected={isActiveRoute("/dashboard/settings")}
            sx={{
              minHeight: 44,

              px: {
                md: 1.5,
                lg: 2,
              },

              borderRadius: 1,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: {
                  md: 36,
                  lg: 40,
                },

                color: "text.secondary",
              }}
            >
              <Settings size={19} strokeWidth={1.8} />
            </ListItemIcon>

            <ListItemText
              primary="تنظیمات"
              slotProps={{
                primary: {
                  sx: {
                    fontSize: 14,
                    fontWeight: 500,
                  },
                },
              }}
            />
          </ListItemButton>
        </Stack>
      </Box>
    </>
  );
}
