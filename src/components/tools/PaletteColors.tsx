"use client";

import CloseIcon from "@/icons/Close";
import { useState, useEffect } from "react";

export default function PaletteColors() {
  const [notification, setNotification] = useState({
    text: "",
    status: false,
  });
  const [color, setColor] = useState("#ffffff");
  const [combinations, setCombinations] = useState([
    { hex: color, display: color },
    { hex: color, display: color },
    { hex: color, display: color },
  ]);
  const [savedPalettes, setSavedPalettes] = useState<
    Array<typeof combinations>
  >([]);

  useEffect(() => {
    const saved = localStorage.getItem("colorPalettes");
    if (saved) {
      setSavedPalettes(JSON.parse(saved));
    }
  }, []);

  const savePalette = () => {
    const newPalettes = [...savedPalettes, combinations];
    localStorage.setItem("colorPalettes", JSON.stringify(newPalettes));
    setSavedPalettes(newPalettes);
    showNotification("💾 Paleta guardada");
  };

  const deletePalette = (index: number) => {
    const newPalettes = savedPalettes.filter((_, i) => i !== index);
    localStorage.setItem("colorPalettes", JSON.stringify(newPalettes));
    setSavedPalettes(newPalettes);
  };

  const convertColor = (hexColor: string, format: string): string => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    switch (format) {
      case "rgb":
        return `rgb(${r},${g},${b})`;
      case "rgba":
        return `rgba(${r},${g},${b},0.8)`;
      default:
        return hexColor;
    }
  };

  const showNotification = (text: string) => {
    if (notification.status === true) return;
    setNotification({ text, status: true });
    setTimeout(() => setNotification({ text: "", status: false }), 2000);
  };

  useEffect(() => {
    const generateColor = (hex: string, shift: number): string => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);

      const adjustColor = (value: number) =>
        Math.min(255, Math.max(0, value + shift));

      const newR = adjustColor(r);
      const newG = adjustColor(g);
      const newB = adjustColor(b);

      return `#${[newR, newG, newB]
        .map((c) => c.toString(16).padStart(2, "0"))
        .join("")}`;
    };

    setCombinations([
      { hex: color, display: color },
      { hex: generateColor(color, 60), display: generateColor(color, 60) },
      { hex: generateColor(color, -60), display: generateColor(color, -60) },
    ]);
  }, [color]);

  const handleColorChange = (index: number, format: string) => {
    setCombinations((prev) =>
      prev.map((comb, i) =>
        i === index
          ? { ...comb, display: convertColor(comb.hex, format) }
          : comb
      )
    );
  };

  const handleCopyColor = (colorValue: string) => {
    navigator.clipboard.writeText(colorValue);
    showNotification("✏️ Se ha copiado correctamente");
  };

  const isValidHexColor = (color: string): boolean => {
    return /^#[0-9A-Fa-f]{6}$/.test(color);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-flow-col">
        <div className="flex items-center w-full row-span-1 p-4 rounded-lg select-none bg-neutral-900 gap-x-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="bg-transparent size-[50px] cursor-pointer"
          />
          <input
            type="text"
            value={color}
            maxLength={7}
            onChange={(e) => {
              let newColor = e.target.value;
              if (!newColor.startsWith("#")) {
                newColor = "#" + newColor;
              }
              if (isValidHexColor(newColor)) {
                setColor(newColor);
              }
            }}
            className="w-full p-2 border-2 rounded-lg outline-none border-neutral-700 bg-neutral-800"
          />
          <button
            onClick={() => handleCopyColor(color)}
            className="px-4 py-2 font-medium text-yellow-400 transition-colors border-2 border-transparent rounded-lg hover:border-yellow-400 bg-yellow-400/20"
          >
            Copiar
          </button>
        </div>
        <div className="row-span-1 p-4 space-y-3 border-l-4 border-yellow-400 bg-yellow-400/20">
          <h1 className="text-2xl font-bold text-yellow-400">
            ⭐ ¡Conoce NxGo!
          </h1>
          <p className="text-neutral-300">
            🚀 Este proyecto ha sido creado con pasión por el equipo de{" "}
            <strong>NxGo</strong>. ¡Tu apoyo significa mucho para nosotros! Dale
            una ⭐ al repositorio y únete a nuestra comunidad en Discord para
            estar al tanto de actualizaciones emocionantes y nuevos proyectos
            increíbles. 🛠️✨
          </p>
          <div className="flex gap-4">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-medium text-white transition-all rounded-lg bg-yellow-400/10 hover:bg-yellow-400/20"
            >
              Únete a Discord 💬
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-medium text-white transition-all rounded-lg bg-yellow-400/10 hover:bg-yellow-400/20"
            >
              Ver Repositorio 📂
            </a>
          </div>
        </div>

        <div className="row-span-2 p-4 rounded-lg lg:max-w-[450px] w-full bg-neutral-900 space-y-4 select-none">
          <h3 className="font-medium">Otras combinaciones</h3>
          <div className="flex flex-col gap-y-2">
            {combinations.map((comb, index) => (
              <div key={index} className="flex flex-wrap gap-2 md:flex-nowrap">
                <div className="flex items-center flex-1 gap-x-2">
                  <input
                    type="color"
                    value={comb.hex}
                    readOnly
                    className="w-8 h-8 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    readOnly
                    className="w-full px-4 py-2 transition-colors rounded-lg outline-none cursor-pointer bg-neutral-800 hover:bg-neutral-700"
                    value={comb.display}
                    onClick={() => handleCopyColor(comb.display)}
                  />
                </div>
                <select
                  className="p-2 rounded-lg outline-none bg-neutral-800"
                  onChange={(e) => handleColorChange(index, e.target.value)}
                >
                  <option value="hex">HEX</option>
                  <option value="rgb">RGB</option>
                  <option value="rgba">RGBA</option>
                </select>
              </div>
            ))}
          </div>
          <button
            onClick={savePalette}
            className="w-full px-4 py-2 font-medium text-yellow-400 transition-colors border-2 border-transparent rounded-lg hover:border-yellow-400 bg-yellow-400/20"
          >
            Guardar Paleta
          </button>
        </div>
      </div>

      {savedPalettes.length > 0 && (
        <div className="w-full p-4 rounded-lg bg-neutral-900">
          <h3 className="mb-4 font-medium">✨ Paletas Guardadas</h3>
          <div className="flex flex-wrap justify-between gap-2 md:justify-start">
            {savedPalettes.map((palette, paletteIndex) => (
              <div
                key={paletteIndex}
                className="flex gap-4 p-4 rounded-lg bg-neutral-800"
              >
                <div className="flex gap-3">
                  {palette.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="rounded-full cursor-pointer size-8"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => handleCopyColor(color.hex)}
                    />
                  ))}
                </div>
                <button
                  onClick={() => deletePalette(paletteIndex)}
                  className="p-1 text-red-500 transition-opacity rounded-lg hover:opacity-80 bg-red-500/20"
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {notification.status === true && (
        <div className="fixed px-4 py-2 text-white border-2 border-yellow-400 rounded-lg select-none bg-yellow-400/20 bottom-4 right-4">
          {notification.text}
        </div>
      )}
    </div>
  );
}
