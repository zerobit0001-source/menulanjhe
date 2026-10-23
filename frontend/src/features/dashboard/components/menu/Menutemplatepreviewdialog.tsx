"use client";

import type { FormEvent, MouseEvent, ReactNode } from "react";
import { useId } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";

/** Only the fields the dialog needs; compatible with the project's MenuTemplate type. */
export type MenuTemplatePreviewTarget = {
  id: string | number;
  name: string;
};

type MenuTemplatePreviewDialogProps = {
  open: boolean;
  template: MenuTemplatePreviewTarget | null;
  onClose: () => void;
  /**
   * The real menu, e.g.
   * <MenuRenderer preview template={...} menu={menu} qrToken={qrToken} tableName={tableName} />
   * Rendered only while the dialog is open (MUI unmounts dialog content when closed).
   */
  children: ReactNode;
};

const FRAME_WIDTH = 390;
const FRAME_MAX_HEIGHT = 800;
// Dialog chrome (title bar + paddings) subtracted from the viewport.
const CHROME_HEIGHT = 112;

/** Defense in depth: stop navigation and form posts inside the preview. */
function blockLinkNavigation(e: MouseEvent<HTMLElement>) {
  const anchor = (e.target as HTMLElement).closest("a[href]");
  if (anchor) e.preventDefault();
}
function blockFormSubmit(e: FormEvent<HTMLElement>) {
  e.preventDefault();
}

export default function MenuTemplatePreviewDialog({
  open,
  template,
  onClose,
  children,
}: MenuTemplatePreviewDialogProps) {



  const titleId = useId();

  return (
    <Dialog
      open={open}
      onClose={onClose} // Escape and backdrop click
      maxWidth="sm"
      fullWidth
      scroll="body"
      aria-labelledby={titleId}
      slotProps={{
        paper: {
          sx: {
            m: { xs: 1, sm: 2 },
            width: { xs: "calc(100% - 16px)", sm: "100%" },
            maxHeight: "calc(100dvh - 16px)",
            overflow: "hidden",
            borderRadius: 3,
          },
        },
      }}
    >
      <DialogTitle
        id={titleId}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          py: 1.5,
        }}
      >
        <Typography component="span" variant="h6" noWrap>
          {template ? `پیش‌نمایش قالب: ${template.name}` : "پیش‌نمایش قالب"}
        </Typography>
        <IconButton
          aria-label="بستن پیش‌نمایش"
          onClick={onClose}
          edge="end"
          sx={{
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.main",
              outlineOffset: 2,
            },
          }}
        >
          <X size={20} aria-hidden />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "action.hover",
          p: { xs: 1.5, sm: 2.5 },
          overflow: "hidden",
        }}
      >
        {/* Device frame */}
        <Box
          sx={{
            width: "100%",
            maxWidth: FRAME_WIDTH,
            height: `min(${FRAME_MAX_HEIGHT}px, calc(100dvh - ${CHROME_HEIGHT + 40}px))`,
            minHeight: 360,
            p: "10px",
            bgcolor: "#111",
            borderRadius: "36px",
            boxShadow: "0 20px 50px rgba(0,0,0,.35), inset 0 0 0 2px #333",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Notch */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 96,
              height: 22,
              bgcolor: "#111",
              borderBottomLeftRadius: 14,
              borderBottomRightRadius: 14,
              zIndex: 2,
            }}
          />
          {/*
            The single scroll container. `transform` makes this the containing
            block for position:fixed descendants (sticky cart bars, bottom nav),
            so they stay inside the frame instead of the browser viewport.
          */}
          <Box
            tabIndex={0}
            role="region"
            aria-label={
              template
                ? `پیش‌نمایش منو با قالب ${template.name}`
                : "پیش‌نمایش منو"
            }
            onClickCapture={blockLinkNavigation}
            onSubmitCapture={blockFormSubmit}
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overflowX: "hidden",
              overscrollBehavior: "contain",
              transform: "translateZ(0)",
              borderRadius: "28px",
              bgcolor: "background.paper",
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: 2,
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
