"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function DownloadBanner() {
  return (
    <div className="mx-6 mt-16 mb-6 rounded-xl bg-gradient-to-r from-black to-gray-800 text-white px-5 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
      {/* TEXT */}
      <div className="flex flex-col">
        <span className="font-semibold text-sm md:text-base">
          Better experience with Axoma Desktop
        </span>

        <span className="text-gray-300 text-xs md:text-sm mt-1">
          Required for candidates • smoother exams & real-time proctoring
        </span>
      </div>

      {/* CTA */}
      <Button
        size="sm"
        className="bg-white text-black hover:bg-gray-200 shrink-0"
        onClick={() =>
          window.open(
            "https://downloads.axoma.com/axoma-setup-v1.0.0.exe",
            "_blank",
          )
        }
      >
        <Download className="mr-2 h-4 w-4" />
        Download App
      </Button>
    </div>
  );
}
