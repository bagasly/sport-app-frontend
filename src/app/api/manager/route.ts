import { NextResponse } from "next/server"
import { Manager } from "@/types/manager"

const dummyManagers: Manager[] = [
  { id: 1, nama: "Andi" },
  { id: 2, nama: "Budi" },
  { id: 3, nama: "Cici" },
]

export async function GET() {
  try {
    const res = await fetch("http://localhost:3001/manager", {
      cache: "no-store",
    })

    if (!res.ok) throw new Error("Failed to fetch from backend")

    const data = await res.json()
    return NextResponse.json({ data })
  } catch (error) {
    console.warn("Fallback to dummy manager:", error)
    return NextResponse.json({ data: dummyManagers })
  }
}
