import { NextResponse } from "next/server";
import { dummyDashboardData } from "@/lib/api/dashboard";

export async function GET() {
  try {
    const res = await fetch("http://localhost:3001/api/dashboard", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Backend error");

    const data = await res.json();
    return NextResponse.json(data); // langsung kembalikan data dari backend
  } catch (error) {
    console.error("Gagal ambil dari backend, fallback dummy:", error);
    return NextResponse.json(dummyDashboardData);
  }
}
