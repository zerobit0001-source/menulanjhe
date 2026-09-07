"use client";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { Bell, Search, ChevronDown } from "lucide-react";

export default function DashboardNavbar() {
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
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Shop */}
        <Button
          variant="text"
          color="inherit"
          sx={{
            p: 1,
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
              gap: 1,
            }}
          >
            {/* Shop Avatar */}
            <Avatar
              variant="rounded"
              sx={{
                width: 36,
                height: 36,
                bgcolor: "grey.900",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              M
            </Avatar>

            {/* Shop Info */}
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2">فروشگاه من</Typography>

              <Typography variant="caption">فروشگاه فعال</Typography>
            </Box>

            <ChevronDown size={16} color="currentColor" />
          </Box>
        </Button>

        {/* Right */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {/* Search */}

          {/* Notification */}
          <IconButton
            sx={{
              width: 40,
              height: 40,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              color: "text.secondary",
              "&:hover": {
                bgcolor: "grey.50",
              },
            }}
          >
            <Bell size={18} strokeWidth={1.8} />
          </IconButton>

          {/* Avatar */}
          <Avatar
            sx={{
              width: 40,
              height: 40,
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
