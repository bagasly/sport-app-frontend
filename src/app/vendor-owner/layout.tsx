'use client'

import React from 'react'
import { AppSidebar } from "@/components/vendor-owner/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/vendor-owner/header"
import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const labelMap: Record<string, string> = {
  'vendor-owner': 'Vendor Owner',
  dashboard: 'Dashboard',
  cabang: 'Cabang',
  stokProduk: 'Stok & Produk',
  laporan: 'Laporan',
  operator: 'Operator',
  pengaturan: 'Pengaturan',
  lapangan: 'Lapangan',
  daftarLapangan: 'Daftar Lapangan',
  jamHarga: 'Jam dan Harga',
}


export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const pathParts = pathname.split('/').filter(part => part)
  const lastPart = pathParts[pathParts.length - 1]
  const pageTitle = labelMap[lastPart] || decodeURIComponent(lastPart)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="justify-between flex h-16 shrink-0 items-center border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
          </div>
          <Header />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 px-10">
          {/* Bagian bawah: judul halaman + breadcrumb */}
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                {/* Selalu render vendor-owner sebagai root */}
                <BreadcrumbItem>
                  <BreadcrumbLink href="/vendor-owner">Vendor Owner</BreadcrumbLink>
                </BreadcrumbItem>

                {/* Iterasi path selanjutnya */}
                {pathParts.slice(1).map((part, index) => {
                  const href = '/vendor-owner/' + pathParts.slice(1, index + 2).join('/')
                  const isLast = index === pathParts.slice(1).length - 1
                  const label = labelMap[part] || decodeURIComponent(part)
                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          {isLast ? <span>{label}</span> : <a href={href}>{label}</a>}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </React.Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl sm:text-3xl font-bold py-8">{pageTitle}</h1>
          </div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
