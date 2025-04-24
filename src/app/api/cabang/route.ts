import { NextResponse } from "next/server"
import { Cabang } from "@/types/cabang"

const dummyCabang: Cabang[] = [
  {
    nama: "Cabang Jakarta",
    lat: -6.200000,
    lng: 106.816666,
    lokasi: "Jl. Sudirman No. 1, Jakarta",
    manager: ["Budi", "Ani"],
  },
  {
    nama: "Cabang Bandung",
    lat: -6.914744,
    lng: 107.609810,
    lokasi: "Jl. Dago No. 10, Bandung",
    manager: ["Tono", "Sari"],
  },
]


export async function GET() {
  try {
    const res = await fetch("http://localhost:3001/api/cabang", {
      cache: "no-store",
    })

    if (!res.ok) throw new Error("Backend error")

    const data = await res.json()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Gagal ambil dari backend, fallback dummy:", error)
    return NextResponse.json({ data: dummyCabang })
  }
}
