"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, TooltipItem } from "chart.js";

// Registrasi Chart.js modules
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

interface BookingData {
  daily: { label: string; bookings: number }[];
  monthly: { label: string; bookings: number }[];
  yearly: { label: string; bookings: number }[];
}

interface BookingChartProps {
  data: BookingData;
}

export default function BookingChart({ data }: BookingChartProps) {
  const [selectedRange, setSelectedRange] = useState<"daily" | "monthly" | "yearly">("daily");

  // Ambil data sesuai pilihan user
  const chartData = useMemo(() => data[selectedRange] || [], [selectedRange, data]);

  // Konfigurasi Chart
  const chartConfig = useMemo(
    () => ({
      labels: chartData.map((item) => item.label),
      datasets: [
        {
          label: "Jumlah Booking",
          data: chartData.map((item) => item.bookings),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4, // Buat garis lebih smooth
          pointRadius: 5, // Ukuran titik data
          pointHoverRadius: 7, // Efek hover titik data
        },
      ],
    }),
    [chartData]
  );

  // Opsi Chart
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
        },
        tooltip: {
          callbacks: {
            label: (context: TooltipItem<"line">) => ` ${context.raw as number} booking`,
          },
        },
      },
      scales: {
        y: { beginAtZero: true },
        x: { ticks: { autoSkip: false, maxRotation: 45, minRotation: 0 } },
      },
      animation: {
        duration: 800,
        easing: "easeInOutQuad" as const,
      },
    }),
    []
  );

  // Handle perubahan pilihan user
  const handleChange = useCallback((value: string) => {
    setSelectedRange(value as "daily" | "monthly" | "yearly");
  }, []);

  return (
    <Card className="p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Grafik Booking Lapangan</h2>
        <Select value={selectedRange} onValueChange={handleChange}>
          <SelectTrigger className="w-[150px] border-gray-300">
            <SelectValue>
              {selectedRange === "daily" ? "Harian" : selectedRange === "monthly" ? "Bulanan" : "Tahunan"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Harian</SelectItem>
            <SelectItem value="monthly">Bulanan</SelectItem>
            <SelectItem value="yearly">Tahunan</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <CardContent className="h-[350px] w-full">
        <Line data={chartConfig} options={chartOptions} />
      </CardContent>
    </Card>
  );
}
