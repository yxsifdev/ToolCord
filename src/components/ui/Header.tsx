import Image from "next/image";
import Link from "next/link";
import React from "react";
import nxgoLogo from "@/images/nxgo-update-logo.webp";
import GithubIcon from "@/icons/GitHub";
import XIcon from "@/icons/X";

export default function HeaderComponent() {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-x-10">
        <div className="flex items-center gap-x-2">
          <Image
            src={nxgoLogo}
            alt="ToolCord"
            width={30}
            height={30}
            className="rounded-lg"
          />
          <h2 className="text-xl font-bold">ToolCord</h2>
        </div>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-x-5">
            <li>
              <Link
                href="/info"
                className="font-medium transition-colors text-neutral-600 hover:text-white"
              >
                Información
              </Link>
            </li>
            <li>
              <Link
                href="/tools"
                className="font-medium transition-colors text-neutral-600 hover:text-white"
              >
                Herramientas
              </Link>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                className="font-medium transition-colors text-neutral-600 hover:text-white"
              >
                Bugs
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-x-5">
        <a
          href="https://x.com/yxsifdev"
          target="_blank"
          className="px-4 py-2 border-r-2 border-neutral-800"
        >
          <XIcon />
        </a>
        <a
          href="https://github.com/yxsifdev"
          target="_blank"
          className="inline-flex items-center px-4 py-2 font-medium transition-colors bg-yellow-500 rounded-md gap-x-2 hover:bg-yellow-500/80"
        >
          <GithubIcon className="size-5" />
          GitHub
        </a>
      </div>
    </header>
  );
}
