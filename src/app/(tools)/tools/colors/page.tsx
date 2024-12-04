import PaletteColors from "@/components/tools/PaletteColors";
import React from "react";

export default function ColorsTool() {
  return (
    <>
      <section>
        <h2 className="font-medium">Generador de Paleta de Colores</h2>
        <p className="mb-5 text-neutral-500">
          Genera una paleta de colores basada en el color que elijas.
        </p>
        <PaletteColors />
      </section>
      <section>
        <div>Colors</div>
      </section>
    </>
  );
}
