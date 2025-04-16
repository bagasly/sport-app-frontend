import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DashboardPage from "@/components/vendor-owner/dashboard/DashboardPage";

export default function DPage() {
  return (
    <>
      {/* Page Header */}
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
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        <DashboardPage />
      </div>
      
      {/* Footer */}
      <footer className="w-full text-grey-500 py-2 flex justify-center items-center text-sm">
        <p>© 2025 • Atletix | Sport Hub Integration Platform</p>
      </footer>
    </>
  );
}
