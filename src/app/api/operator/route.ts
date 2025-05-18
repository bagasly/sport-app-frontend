import { NextResponse } from "next/server"
import { Operator } from "@/types/operator"

const dummyOperators: Operator[] = [
  {
    id: 1,
    nama: "Rina",
    username: "rina123",
    email: "rina@example.com",
    noHp: "081234567890",
    role: "manager",
  },
  {
    id: 2,
    nama: "Budi",
    username: "budiop",
    email: "budi@example.com",
    noHp: "089876543210",
    role: "kasir",
  },
]

export async function GET() {
  try {
    const res = await fetch("http://localhost:3001/api/operator", {
      cache: "no-store",
    })

    if (!res.ok) throw new Error("Backend error")

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Gagal ambil data operator dari backend, fallback dummy:", error)
    return NextResponse.json(dummyOperators)
  }
}
