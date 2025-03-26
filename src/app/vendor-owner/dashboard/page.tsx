import SidebarLayout from "@/components/vendor-owner/sidebar-layout";
import Header from "@/components/vendor-owner/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Page() {
  return (
    <SidebarLayout>
      <Header />

      {/* Page Content */}
      <div className="px-6 py-4 bg-gray-100">
        <h1 className="text-lg font-bold">DASHBOARD</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </SidebarLayout>
  );
}
