import { NextResponse } from "next/server"
import { DaftarLapangan } from "@/types/daftarLapangan"

const dummyDaftarLapangan: DaftarLapangan[] = [
  {
    id: 1,
    nama: "Lapangan A",
    cabangOlahraga: "Futsal",
    jenisLantai: "Rumput Sintetis",
    open: "08:00",
    close: "00:00",
  },
  {
    id: 2,
    nama: "Lapangan B",
    cabangOlahraga: "Futsal",
    jenisLantai: "Vinyl",
    open: "08:00",
    close: "00:00",
  },
]

export async function GET() {
  try {
    const res = await fetch("http://localhost:3001/api/daftarLapangan", {
      cache: "no-store",
    })

    if (!res.ok) throw new Error("Backend error")

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Gagal ambil data operator dari backend, fallback dummy:", error)
    return NextResponse.json(dummyDaftarLapangan)
  }
}
