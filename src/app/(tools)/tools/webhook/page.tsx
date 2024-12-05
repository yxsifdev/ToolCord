"use client";

import WebhookComponent from "@/components/tools/Webhook";
import { useState } from "react";

export default function WebHookTool() {
  const [previewMessage, setPreviewMessage] = useState("");

  return (
    <main className="w-full p-4 grid md:grid-cols-2 gap-4">
      <section className="md:overflow-y-auto h-full">
        <WebhookComponent onMessageChange={setPreviewMessage} />
      </section>
      <section className="overflow-y-auto break-words h-full bg-neutral-900 rounded-lg p-4 font-light text-sm text-neutral-300">
        <div className="whitespace-pre-wrap">
          {previewMessage || "Comienza a escribir un mensaje..."}
        </div>
      </section>
    </main>
  );
}
