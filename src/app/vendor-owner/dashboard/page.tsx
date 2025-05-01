import DashboardPage from "@/components/vendor-owner/dashboard/DashboardPage";

export default function DPage() {
  return (
    <>
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
