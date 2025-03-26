"use client";

import * as React from "react";
import {
  LayoutGrid,
  Map,
  ShoppingBag,
  Users,
  FileText,
  LogOut,
} from "lucide-react";

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
      icon: LayoutGrid,
      isActive: true,
    },
    {
      title: "Lapangan",
      url: "#",
      icon: Map,
      items: [
        { title: "Daftar Lapangan", url: "#" },
        { title: "Jam dan Harga", url: "#" },
      ],
    },
    {
      title: "Produk",
      url: "#",
      icon: ShoppingBag,
      items: [
        { title: "Kategori produk", url: "#" },
        { title: "Daftar produk", url: "#" },
      ],
    },
    {
      title: "Operator",
      url: "#",
      icon: Users,
    },
    {
      title: "Laporan",
      url: "#",
      icon: FileText,
    },
  ],
};

export function AppSidebar({ collapsible, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header dengan Logo */}
      <SidebarHeader className="flex flex-col items-center justify-center p-4">
        <img src="/logo.svg" alt="Atletix Logo" className="h-12 w-auto" />
      </SidebarHeader>

      {/* Navigasi Menu */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Tombol Keluar */}
      <SidebarFooter>
        <Button
          size="lg"
          className="w-[50%] mx-auto mb-10 flex items-center px-2 py-2 rounded-md transition-all 
                     hover:bg-red-700 hover:text-white data-[state=open]:bg-red-600"
        >
          <LogOut className="w-5 h-5" />
          <span
            className="transition-all duration-200 ml-2 truncate text-xs font-medium 
               data-[state=closed]:opacity-0 data-[state=closed]:w-0 overflow-hidden"
          >
            Keluar
          </span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
