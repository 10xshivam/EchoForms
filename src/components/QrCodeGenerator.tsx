"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "./ui/button";

export default function QrCodeGenerator({ shareUrl }: { shareUrl: string }) {
  const [showQR, setShowQR] = useState(false);

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "form-qrcode.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="outline" onClick={() => setShowQR(!showQR)}>
        {showQR ? "Hide QR Code" : "Generate QR Code"}
      </Button>

      {showQR && (
        <div className="p-4 border rounded-lg">
          <QRCodeCanvas id="qr-code" value={shareUrl} size={150} />
          <Button
            variant="default"
            className="mt-2 w-full"
            onClick={downloadQRCode}
          >
            Download QR Code
          </Button>
        </div>
      )}
    </div>
  );
}
