"use client";

import Image from "next/image";
import { useState } from "react";

interface WebhookInfo {
  name: string;
  id: string;
  avatar?: string;
  channel_id: string;
}

export default function WebhookComponent({
  onMessageChange,
}: {
  onMessageChange: (message: string) => void;
}) {
  const [notification, setNotification] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookInfo, setWebhookInfo] = useState<WebhookInfo | null>(null);

  const fetchWebhookInfo = async () => {
    if (!webhookUrl) return;

    if (!webhookUrl.includes("discord.com/api/webhooks")) return;

    try {
      const response = await fetch(webhookUrl);
      if (response.ok) {
        const data = await response.json();
        setWebhookInfo(data);
        onMessageChange(message);
      }
    } catch (error) {
      console.error("Error al obtener información del webhook:", error);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    onMessageChange(e.target.value);
  };

  const handleSubmit = async () => {
    if (!webhookUrl || !message) return;

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
        }),
      });

      if (response.ok) {
        setNotification(true);
        setTimeout(() => setNotification(false), 3000);
      }
    } catch (error) {
      console.error("Error al enviar webhook:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2 select-none bg-neutral-900 rounded-lg p-4">
        <input
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          onBlur={fetchWebhookInfo}
          type="text"
          autoComplete="off"
          placeholder="https://discord.com/api/webhooks/..."
          className="w-full p-2 border-2 rounded-lg outline-none border-neutral-700 bg-neutral-800 placeholder:text-neutral-500"
        />
      </div>

      {webhookInfo && (
        <div className="bg-neutral-900 rounded-lg p-4">
          <div className="flex items-center gap-x-3 mb-4">
            {webhookInfo.avatar && (
              <Image
                src={`https://cdn.discordapp.com/avatars/${webhookInfo.id}/${webhookInfo.avatar}.png`}
                alt="Webhook Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <h3 className="font-medium">{webhookInfo.name}</h3>
              <p className="text-sm text-neutral-400">
                Canal ID: {webhookInfo.channel_id}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-neutral-900 rounded-lg p-4">
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="Escribe tu mensaje aquí..."
          className="w-full h-52 md:h-80 p-2 border-2 rounded-lg outline-none border-neutral-700 bg-neutral-800 placeholder:text-neutral-500 resize-none"
        />
        <button
          onClick={handleSubmit}
          className="w-full mt-2 px-4 py-2 font-medium text-yellow-400 transition-colors border-2 border-transparent rounded-lg hover:border-yellow-400 bg-yellow-400/20"
        >
          Enviar
        </button>
      </div>
      {notification === true && (
        <div className="fixed px-4 py-2 text-white border-2 border-yellow-400 rounded-lg select-none bg-yellow-400/20 bottom-4 right-4">
          ✅ Mensaje enviado correctamente
        </div>
      )}
    </div>
  );
}
