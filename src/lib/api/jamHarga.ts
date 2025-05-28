import { JamHarga } from "@/types/jamHarga"
import { fetchWithFallback } from "./fetchWithFallback"

export const dummyJamHarga: JamHarga[] = [
  {
    id: "1",
    tempat: "Lapangan A",
    hari: "Senin",
    jamBuka: "08:00",
    jamTutup: "17:00",
    harga: 100000,
  },
  {
    id: "2",
    tempat: "Lapangan A",
    hari: "Jumat",
    jamBuka: "17:00",
    jamTutup: "22:00",
    harga: 150000,
  },
  {
    id: "3",
    tempat: "Lapangan A",
    hari: "Minggu",
    jamBuka: "08:00",
    jamTutup: "22:00",
    harga: 170000,
  },
]

export async function getJamHarga(): Promise<JamHarga[]> {
  return fetchWithFallback<JamHarga[]>("/api/lapangan/jamHarga", dummyJamHarga)
}
