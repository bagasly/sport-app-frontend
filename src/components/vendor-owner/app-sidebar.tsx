"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  MapPlus,
  GalleryVerticalEnd,
  ShieldUser,
  FileClock,
  ChevronDown,
  ChevronLeft,
  Circle,
} from "lucide-react";
import Image from "next/image";
import logowhite from "../../../public/logowhite.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
  submenu?: { title: string; url: string; icon?: React.ElementType }[];
}

const items: MenuItem[] = [
  { title: "DASHBOARD", url: "#", icon: LayoutDashboard },
  {
    title: "LAPANGAN",
    url: "#",
    icon: MapPlus,
    submenu: [
      { title: "DAFTAR LAPANGAN", url: "#", icon: Circle },
      { title: "JAM DAN HARGA", url: "#", icon: Circle },
    ],
  },
  {
    title: "PRODUK",
    url: "#",
    icon: GalleryVerticalEnd,
    submenu: [
      { title: "KATEGORI", url: "#", icon: Circle },
      { title: "PRODUK", url: "#", icon: Circle },
    ],
  },
  { title: "OPERATOR", url: "#", icon: ShieldUser },
  {
    title: "LAPORAN",
    url: "#",
    icon: FileClock,
    submenu: [
      { title: "KEUANGAN", url: "#", icon: Circle },
      { title: "KENDALA", url: "#", icon: Circle },
    ],
  },
];

export const AppSidebar: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleMenu = (index: number) => {
    if (isSidebarOpen) {
      setOpenIndex((prev) => (prev === index ? null : index));
    }
  };

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <Sidebar
        className={`bg-sidebar-background text-sidebar-foreground h-screen transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <SidebarContent>
          {/* Logo */}
          <section className="flex justify-center py-6">
            <Image
              src={logowhite}
              className={`transition-all duration-300 ${
                isSidebarOpen ? "w-30 h-auto" : "w-8 h-auto"
              }`}
              width={200}
              height={100}
              alt="logowhite"
            />
          </section>

          {/* Sidebar Menu */}
          <SidebarMenu className="flex-col w-full space-y-2 px-4">
            {items.map((item, index) => (
              <div key={index}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => isSidebarOpen && item.submenu && toggleMenu(index)}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-md 
                      text-sidebar-foreground hover:bg-sidebar-primary 
                      hover:text-sidebar-primary-foreground transition duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="w-5 h-5" />
                        {isSidebarOpen && item.title}
                      </div>
                      {isSidebarOpen && item.submenu && (
                        openIndex === index ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronLeft className="w-4 h-4" />
                        )
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Submenu hanya muncul jika sidebar terbuka */}
                {isSidebarOpen && item.submenu && (
                  <div
                    className={`pl-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.submenu.map((sub, subIndex) => (
                      <a
                        key={subIndex}
                        href={sub.url}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition duration-200 rounded-md"
                      >
                        {sub.icon && <sub.icon className="w-2 h-2" />}
                        {sub.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};
