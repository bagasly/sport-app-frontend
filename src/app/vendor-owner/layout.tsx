import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/vendor-owner/app-sidebar"

import "@/styles/globals.css";


export default function SideBarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="root">
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
