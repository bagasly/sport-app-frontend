"use client";

import * as React from "react";
import {
  LayoutDashboard,
  MapPlus,
  GalleryVerticalEnd,
  ShieldUser,
  FileClock,
  LogOut,
  Circle,
} from "lucide-react";

import Image from "next/image";
import logowhite from "../../../public/logowhite.svg";

import { Button } from "@/components/ui/button";
import { NavMain } from "@/components/vendor-owner/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Lapangan",
      url: "#",
      icon: MapPlus,
      items: [
        { title: "Daftar Lapangan", url: "#", icons: Circle },
        { title: "Jam dan Harga", url: "#", icons: Circle},
      ],
    },
    {
      title: "Produk",
      url: "#",
      icon: GalleryVerticalEnd,
      items: [
        { title: "Kategori produk", url: "#", icons: Circle },
        { title: "Daftar produk", url: "#", icons: Circle },
      ],
    },
    {
      title: "Operator",
      url: "#",
      icon: ShieldUser,
    },
    {
      title: "Laporan",
      url: "#",
      icon: FileClock,
      
    },
  ],
};



export function AppSidebar({ collapsible, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header dengan Logo */}
      <SidebarHeader className="flex flex-col items-center justify-center p-4">
        <section >
        <Image
              src={logowhite}
              className="w=30 h=auto"
              width={200}
              height={100}
              alt="logowhite"
            />
        </section>
      </SidebarHeader>

      {/* Navigasi Menu */}
      <SidebarContent className="flex-col w-full space-y-2 px-4">
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Tombol Keluar */}
      <SidebarFooter>
        <Button
          size="lg"
          className="w-[50%] bg-sidebar-button text-white mx-auto mb-10 flex items-center px-2 py-2 rounded-md transition-all hover:bg-sidebar-button-foreground hover:text-white"
        >
          <LogOut className="w-5 h-5" />
          <span
            className="transition-all duration-200 ml-2 truncate text-xs font-medium data-[state=closed]:opacity-0 data-[state=closed]:w-0 overflow-hidden"
          >
            Keluar
          </span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
