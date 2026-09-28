"use client";

import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";

import { Bell, ChevronDown, Menu } from "lucide-react";

type DashboardNavbarProps = {
  onMenuClick: () => void;
};

export default function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  return (
    <Box
      component="header"
      sx={{
        height: 80,
        flexShrink: 0,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          height: "100%",

          px: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* =========================
            Mobile Menu Button
        ========================== */}
        <IconButton
          onClick={onMenuClick}
          aria-label="باز کردن منو"
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },

            width: 40,
            height: 40,

            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,

            color: "text.secondary",

            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <Menu size={20} strokeWidth={1.8} />
        </IconButton>

        {/* =========================
            Shop
        ========================== */}
        <Button
          variant="text"
          color="inherit"
          sx={{
            p: {
              xs: 0.5,
              sm: 1,
            },

            minWidth: 0,

            textTransform: "none",
            borderRadius: 1,

            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 0.75,
                sm: 1,
              },
            }}
          >
            {/* Shop Avatar */}
            <Avatar
              variant="rounded"
              sx={{
                width: {
                  xs: 34,
                  sm: 36,
                },

                height: {
                  xs: 34,
                  sm: 36,
                },

                bgcolor: "grey.900",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              M
            </Avatar>

            {/* Shop Info */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },

                textAlign: "right",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                }}
              >
                فروشگاه من
              </Typography>

              <Typography variant="caption" color="text.secondary">
                فروشگاه فعال
              </Typography>
            </Box>

            <ChevronDown size={16} color="currentColor" />
          </Box>
        </Button>

        {/* =========================
            Right Actions
        ========================== */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            gap: {
              xs: 0.75,
              sm: 1.5,
            },
          }}
        >
          {/* Notification */}
          <IconButton
            aria-label="اعلان‌ها"
            sx={{
              width: {
                xs: 38,
                sm: 40,
              },

              height: {
                xs: 38,
                sm: 40,
              },

              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,

              color: "text.secondary",

              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Bell size={18} strokeWidth={1.8} />
          </IconButton>

          {/* Avatar */}
          <Avatar
            sx={{
              width: {
                xs: 36,
                sm: 40,
              },

              height: {
                xs: 36,
                sm: 40,
              },

              bgcolor: "grey.200",
              color: "grey.700",

              fontSize: 14,
              fontWeight: 600,
            }}
          >
            A
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}
