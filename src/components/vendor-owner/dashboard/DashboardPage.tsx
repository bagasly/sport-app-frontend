"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/vendor-owner/dashboard/card/DashboardCard";
import BookingChart from "@/components/vendor-owner/dashboard/card/BookingChart";
import PopularFields from "@/components/vendor-owner/dashboard/card/PopularFields";
import RecentBookings from "@/components/vendor-owner/dashboard/card/RecentBookings"; // ✅ Import RecentBookings

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error("Gagal mengambil data");
        const result = await res.json();

        console.log("Data API:", result); // Debugging

        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <main className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Grid untuk Card Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4">
        {data && (
          <>
            <DashboardCard
              title="Total Pemasukan"
              amount={`Rp ${data.totalRevenue.toLocaleString("id-ID")}`}
              percentage={data.revenueChange}
              isUp={data.revenueChange > 0}
            />
            <DashboardCard
              title="Total Sewa Lapangan"
              amount={`Rp ${data.totalBookings.toLocaleString("id-ID")}`}
              percentage={data.bookingChange}
              isUp={data.bookingChange > 0}
            />
            <DashboardCard
              title="Total Pembelian Produk"
              amount={`Rp ${data.totalProductSales.toLocaleString("id-ID")}`}
              percentage={data.productSalesChange}
              isUp={data.productSalesChange > 0}
            />
          </>
        )}
      </div>

      {/* Grid untuk Chart dan Lapangan Terpopuler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {data && (
          <>
            <BookingChart data={data.chartData} />
            <PopularFields fields={data.popularFields} />
          </>
        )}
      </div>

      {/* Recent Bookings Section */}
      <div className="mt-6">
        {data && <RecentBookings bookings={data.recentBookings} />}{" "}
        {/* ✅ Tambahkan RecentBookings */}
      </div>
    </main>

  );
}
