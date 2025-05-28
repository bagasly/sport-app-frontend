"use client";

import * as React from "react";
import {
  LayoutDashboard,
  MapPinned,
  MapPlus,
  GalleryVerticalEnd,
  ShieldUser,
  FileClock,
  LogOut,
  Settings,
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
      url: "/vendor-owner/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Cabang",
      url: "/vendor-owner/cabang",
      icon: MapPinned,
    },

    {
      title: "Lapangan",
      url: "/vendor-owner/lapangan/daftarLapangan",
      icon: MapPlus,
      items: [
        {
          title: "Daftar Lapangan",
          url: "/vendor-owner/lapangan/daftarLapangan",
        },
        { title: "Jam dan Harga", url: "/vendor-owner/lapangan/jamHarga"},
      ],
    },
    {
      title: "Stok & Produk",
      url: "/vendor-owner/stokProduk",
      icon: GalleryVerticalEnd,
    },
    {
      title: "Laporan",
      url: "/vendor-owner/laporan",
      icon: FileClock,
    },
    {
      title: "Operator",
      url: "/vendor-owner/operator",
      icon: ShieldUser,
    },
    {
      title: "Pengaturan",
      url: "/vendor-owner/pengaturan",
      icon: Settings,
    },
  ],
};

export function AppSidebar({
  collapsible,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header dengan Logo */}
      <SidebarHeader className="flex flex-col items-center justify-center p-4">
        <section>
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
          <span className="transition-all duration-200 ml-2 truncate text-xs font-medium data-[state=closed]:opacity-0 data-[state=closed]:w-0 overflow-hidden">
            Keluar
          </span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}