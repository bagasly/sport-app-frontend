// lib/api/cabang.ts

import { Cabang } from "@/types/cabang"
import { fetchWithFallback } from "./fetchWithFallback"

const dummyCabang: Cabang[] = [
  {
    nama: "Cabang A",
    lokasi: "Jakarta",
    lat: -6.2,
    lng: 106.816666,
    manager: ["Andi"],
  },
  {
    nama: "Cabang B",
    lokasi: "Bandung",
    lat: -6.914744,
    lng: 107.60981,
    manager: ["Budi"],
  },
]

export async function getCabang(): Promise<Cabang[]> {
  return fetchWithFallback<Cabang[]>("/api/cabang", dummyCabang)
}
