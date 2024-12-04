import Image from "next/image";
import Link from "next/link";

import { ToolsLinks } from "@/consts/consts";
import nxgoLogo from "@/images/nxgo-update-logo.webp";

export default function SideBarComponent() {
  return (
    <div className="hidden lg:block min-w-[300px] border-r border-neutral-800 p-4">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ToolCord
          </Link>
          <Image
            src={nxgoLogo}
            alt="ToolCord"
            width={30}
            height={30}
            className="rounded-lg"
          />
        </div>
        <nav className="flex flex-col gap-y-2">
          <Link
            href="/tools"
            className="px-4 py-2 font-medium text-yellow-400 transition-colors rounded-md hover:bg-yellow-500/20"
          >
            Herramientas
          </Link>
          {ToolsLinks.map((tool) => (
            <Link
              href={tool.href}
              key={tool.label}
              className="px-4 py-2 transition-colors rounded-md hover:bg-neutral-800"
            >
              {tool.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
