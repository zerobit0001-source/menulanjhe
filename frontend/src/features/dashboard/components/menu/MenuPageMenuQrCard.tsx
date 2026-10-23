"use client";

import { useRef, useState } from "react";
import { Download, Maximize2, Printer, QrCode } from "lucide-react";
import { Button, Card, IconButton, Modal, Typography } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

type Props = {
  menuUrl: string;
  qrUrl: string;
  shopName: string;
};

export default function MenuPageMenuQrCard({
  menuUrl,
  qrUrl,
  shopName,
}: Props) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePrint = () => {
    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) return;

    const qrImage = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");

    if (!printWindow) return;

    printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${shopName} - Menu QR</title>

        <style>
          * {
            box-sizing: border-box;
          }

          @page {
            size: 80mm 110mm;
            margin: 0;
          }

          
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
@media print {
  html,
  body {
    width: 100%;
    height: 100%;
    min-height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .poster {
    margin: auto;
  }
}


          .poster {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 80mm;
            height: 110mm;
            padding: 5mm 2mm 4mm;
            overflow: hidden;
            color: black;
            text-align: center;
            border-radiuos : 15px ;
          }

          .brand {
            margin: 0 0 2mm;
            max-width: 100%;
            font-family: Georgia, "Times New Roman", serif;
            font-size: 25pt;
            font-weight: bold;
            line-height: 1.15;
            letter-spacing: -1px;
            overflow-wrap: anywhere;
          }

          .subtitle {
            margin: 0;
            font-size: 11pt;
            font-weight: 400;
            letter-spacing: 0.5px;
          }

          .menu-title {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5mm;
            width: 100%;
            margin-top: 2mm;
            font-size: 18pt;
            font-weight: 800;
            line-height: 1.3;
          }

          .menu-title::before,
          .menu-title::after {
            content: "";
            flex: 1;
            height: 0.6mm;
            background: black;
          }

          .table-label {
            margin-top: 2mm;
            font-size: 10pt;
            font-weight: 700;
            text-transform: uppercase;
          }

          .qr-frame {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 46mm;
            height: 46mm;
            margin-top: 2mm;
            padding: 2mm;
            border: 0.6mm solid black;
            background: transparent;
          }

          .qr-inner {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 1.5mm;
            background: blck;
          }

          .qr-inner img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            image-rendering: pixelated;
          }

          @media screen {
            body {
              display: flex;
              align-items: flex-start;
              justify-content: center;
              background: #e5e5e5;
            }

            .poster {
              box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
            }
          }
        </style>
      </head>

      <body>
        <main class="poster">
          <h1 class="brand">${escapeHtml(shopName)}</h1>

          <p class="subtitle">SCAN QR CODE FOR</p>

          <div class="menu-title">MENU</div>

          <div class="qr-frame">
            <div class="qr-inner">
              <img src="${qrImage}" alt="Menu QR Code" />
            </div>
          </div>
        </main>

        <script>
          const qr = document.querySelector(".qr-inner img");

          qr.onload = () => {
            setTimeout(() => {
              window.print();
            }, 300);
          };

          window.onafterprint = () => window.close();
        </script>
      </body>
    </html>
  `);

    printWindow.document.close();
  };

  function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (char) => {
      const entities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return entities[char];
    });
  }

  return (
    <>
      <Card
        elevation={0}
        className="rounded-2xl! border border-gray-200! bg-white! p-4!"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
            <QrCode size={19} className="text-gray-600" />
          </div>

          <div className="min-w-0 flex-1">
            <Typography className="font-bold! text-gray-900!">
              QR منوی شما
            </Typography>

            <Typography className="mt-1! text-xs! text-gray-400!">
              مشتریان می‌توانند با اسکن این کد منوی شما را مشاهده کنند.
            </Typography>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center">
          <div
            ref={qrRef}
            className="rounded-2xl border border-gray-100 bg-white p-4"
          >
            <QRCodeCanvas value={qrUrl} size={180} level="H" marginSize={2} />
          </div>

          <Typography className="mt-3! max-w-xs! truncate! text-center! text-xs! text-gray-400!">
            {menuUrl}
          </Typography>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Button
            variant="outlined"
            onClick={() => setPreviewOpen(true)}
            startIcon={<Maximize2 size={16} />}
            className="rounded-xl!"
          >
            نمایش بزرگ
          </Button>

          <Button
            variant="outlined"
            onClick={handlePrint}
            startIcon={<Download size={16} />}
            className="rounded-xl!"
          >
            دانلود
          </Button>

          <Button
            variant="outlined"
            onClick={handlePrint}
            startIcon={<Printer size={16} />}
            className="rounded-xl!"
          >
            چاپ
          </Button>
        </div>
      </Card>

      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <div className="absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 outline-none">
          <div className="flex items-center justify-between">
            <div>
              <Typography className="font-bold! text-gray-900!">
                QR منوی {shopName}
              </Typography>

              <Typography className="mt-1! text-xs! text-gray-400!">
                برای مشاهده منو اسکن کنید
              </Typography>
            </div>

            <IconButton size="small" onClick={() => setPreviewOpen(false)}>
              <span className="text-lg">×</span>
            </IconButton>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <QRCodeCanvas value={qrUrl} size={280} level="H" marginSize={3} />
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <Button
              fullWidth
              variant="outlined"
              onClick={handlePrint}
              startIcon={<Download size={16} />}
              className="rounded-xl!"
            >
              دانلود
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={handlePrint}
              startIcon={<Printer size={16} />}
              className="rounded-xl!"
            >
              چاپ
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
