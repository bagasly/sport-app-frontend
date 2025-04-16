import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    totalRevenue: 1000000,
    totalBookings: 750800,
    revenueChange: 34,
    bookingChange: -13,
    totalProductSales: 500000,
    productSalesChange: 12,

    // 📊 Data untuk Grafik Booking (harian, bulanan, tahunan)
    chartData: {
      daily: [
        { label: "Sen", bookings: 200 },
        { label: "Sel", bookings: 400 },
        { label: "Rab", bookings: 600 },
        { label: "Kam", bookings: 800 },
        { label: "Jum", bookings: 1000 },
        { label: "Sab", bookings: 1200 },
      ],
      monthly: [
        { label: "Jan", bookings: 5000 },
        { label: "Feb", bookings: 7000 },
        { label: "Mar", bookings: 9000 },
        { label: "Apr", bookings: 11000 },
        { label: "Mei", bookings: 13000 },
      ],
      yearly: [
        { label: "2021", bookings: 50000 },
        { label: "2022", bookings: 70000 },
        { label: "2023", bookings: 90000 },
        { label: "2024", bookings: 110000 },
        { label: "2025", bookings: 130000 },
      ],
    },

    // 🔥 Lapangan Terpopuler
    popularFields: [
      { name: "Griya Sport Center", price: 150000 },
      { name: "Orion Sport Center", price: 125000 },
      { name: "Putri Hijau Futsal", price: 130000 },
      { name: "Score Futsal", price: 160000 },
      { name: "Defron Futsal", price: 120000 },
      { name: "Watumas Futsal", price: 110000 },
      { name: "Petro Futsal Selera De Cafe", price: 150000 },
      { name: "Purwokerto Sport Center", price: 145000 },
      { name: "Rumah Futsal", price: 125000 },
      { name: "Yuma - Khi Futsal", price: 135000 },
    ],

    // 📌 Recent Bookings
    recentBookings: [
      {
        field: "Orion Sport Center",
        bookingId: "#0008",
        date: "Jan 7th, 2022",
        customer: "Ikrom Nur",
        status: "Delivered",
        price: 200.0,
      },
      {
        field: "Orion Sport Center",
        bookingId: "#0007",
        date: "Jan 7th, 2022",
        customer: "Yazid Maulana",
        status: "Canceled",
        price: 200.0,
      },
      {
        field: "Orion Sport Center",
        bookingId: "#0004",
        date: "Jan 6th, 2022",
        customer: "Bagas Kara",
        status: "Delivered",
        price: 200.0,
      },
      {
        field: "Putri Hijau Futsal",
        bookingId: "#0003",
        date: "Jan 5th, 2022",
        customer: "Dimas Keceh Badai",
        status: "Canceled",
        price: 200.0,
      },
      {
        field: "Porte Futsal",
        bookingId: "#0002",
        date: "Jan 4th, 2022",
        customer: "Pandu Pratama",
        status: "Delivered",
        price: 200.0,
      },
      {
        field: "Putri Hijau Futsal",
        bookingId: "#0001",
        date: "Jan 3rd, 2022",
        customer: "Ikrom Nur",
        status: "Delivered",
        price: 200.0,
      },
    ],
  };

  return NextResponse.json(data);
}
