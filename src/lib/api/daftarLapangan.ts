import { DaftarLapangan } from "@/types/daftarLapangan"
import { fetchWithFallback } from "./fetchWithFallback"

const dummyDaftarLapangan: DaftarLapangan[] = [
  {
    id: 1,
    nama: "Lapangan A",
    cabangOlahraga: "Futsal",
    jenisLantai: "Rumput Sintetis",
    open: "08:00",
    close: "00:00",
    gambar: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    nama: "Lapangan B",
    cabangOlahraga: "Futsal",
    jenisLantai: "Vinyl",
    open: "08:00",
    close: "00:00",
    gambar: "https://via.placeholder.com/150",
  },
]

export async function getDaftarLapangan(): Promise<DaftarLapangan[]> {
  return fetchWithFallback<DaftarLapangan[]>("/api/lapangan/daftarLapangan", dummyDaftarLapangan)
}
