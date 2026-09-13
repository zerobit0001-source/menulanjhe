"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BarChart3,
  BetweenVerticalEnd,
  Coffee,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  SquareMenu,
  Tags,
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

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <Paper
      component="aside"
      elevation={0}
      square
      sx={{
        width: 256,
        flexShrink: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderLeft: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 80,
          px: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          component={Link}
          href="/dashboard"
          variant="h6"
          sx={{
            color: "text.primary",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Menu Lanjhe
        </Typography>
      </Box>

      {/* Navigation */}
      <Box
        component="nav"
        sx={{
          flex: 1,
          px: 2,
          py: 2,
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
                selected={isActive}
                sx={{
                  minHeight: 44,
                  mb: 0.5,
                  px: 2,
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
                    minWidth: 40,
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
                      },
                    },
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* Settings */}
      <Box>
        <Divider />

        <Stack sx={{ p: 2 }}>
          <ListItemButton
            component={Link}
            href="/dashboard/settings"
            selected={isActiveRoute("/dashboard/settings")}
            sx={{
              minHeight: 44,
              px: 2,
              borderRadius: 1,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
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
    </Paper>
  );
}
