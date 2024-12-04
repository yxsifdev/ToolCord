interface ToolsLinksProps {
  label: string;
  href: string;
  description: string;
}

export const ToolsLinks: ToolsLinksProps[] = [
  {
    label: "Colores",
    href: "/tools/colors",
    description: "¡Encuentra el color que necesites aquí!",
  },
  {
    label: "WebHooks",
    href: "/tools/webhook",
    description: "Crea un webhook para tu servidor de Discord.",
  },
  {
    label: "Tiempo",
    href: "/tools/time",
    description: "¡Encuentra el tiempo que necesites aquí!",
  },
  {
    label: "Embeds",
    href: "/tools/embed",
    description: "¡Crea un embed para tu servidor de Discord aquí!",
  },
];
