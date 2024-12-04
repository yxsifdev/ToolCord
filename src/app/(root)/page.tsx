import HeaderComponent from "@/components/ui/Header";
import { ToolsLinks } from "@/consts/consts";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeaderComponent />
      <main className="max-w-5xl mx-auto my-0">
        <section className="px-4 py-5 lg:px-0">
          <div className="mb-5 space-y-4 text-center">
            <h1 className="text-4xl font-bold md:text-6xl text-balance">
              Busca rápidamente{" "}
              <span className="text-yellow-500">herramientas</span>,{" "}
              <span className="text-yellow-500">configuraciones</span> y mucho
              más opciones.
            </h1>
            <p className="max-w-xl mx-auto my-0 md:text-lg text-neutral-500">
              ToolCord es muy buena opción te ayudará a reducir tu tiempo
              perdido en buscar configuraciones o herramientas para tu servidor
              de Discord. ✨
            </p>
          </div>
        </section>
        <section className="px-4 py-5 lg:px-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {ToolsLinks.map(({ label, href, description }) => (
              <Link
                href={href}
                key={label}
                className="p-4 transition-transform border-2 border-yellow-500 rounded-lg bg-yellow-500/20 hover:scale-105"
              >
                <h3 className="text-xl font-bold">{label}</h3>
                <p className="text-neutral-400">{description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
