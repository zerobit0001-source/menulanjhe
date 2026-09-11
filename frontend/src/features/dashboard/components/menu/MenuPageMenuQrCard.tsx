"use client";

import { useRef, useState } from "react";
import { Download, Maximize2, Printer, QrCode } from "lucide-react";
import { Button, Card, IconButton, Modal, Typography } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

type Props = {
  menuUrl: string;
  shopName: string;
};

export default function MenuPageMenuQrCard({ menuUrl, shopName }: Props) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) return;

    const link = document.createElement("a");

    link.download = `${shopName}-menu-qr.png`;
    link.href = canvas.toDataURL("image/png");

    link.click();
  };

  const handlePrint = () => {
    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) return;

    const image = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");

    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="fa" dir="rtl">
        <head>
          <title>QR منوی ${shopName}</title>
          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: sans-serif;
            }

            .container {
              text-align: center;
            }

            img {
              width: 280px;
              height: 280px;
            }

            h2 {
              margin-top: 20px;
              font-size: 22px;
            }

            p {
              margin-top: 8px;
              color: #666;
              font-size: 14px;
            }

            @media print {
              body {
                min-height: auto;
              }
            }
          </style>
        </head>

        <body>
          <div class="container">
            <img src="${image}" alt="QR Code" />
            <h2>${shopName}</h2>
            <p>برای مشاهده منوی دیجیتال اسکن کنید</p>
          </div>

          <script>
            window.onload = function () {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

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
            <QRCodeCanvas value={menuUrl} size={180} level="H" marginSize={2} />
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
            onClick={handleDownload}
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
              <QRCodeCanvas
                value={menuUrl}
                size={280}
                level="H"
                marginSize={3}
              />
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <Button
              fullWidth
              variant="outlined"
              onClick={handleDownload}
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
