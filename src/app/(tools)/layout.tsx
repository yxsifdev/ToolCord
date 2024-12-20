import SideBarComponent from "@/components/tools/SideBar";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ToolCord - Herramientas",
};

export default async function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SideBarComponent />
      {children}
    </div>
  );
}
