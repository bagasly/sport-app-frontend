import { StokProduk } from "@/types/stokProduk"
import { fetchWithFallback } from "./fetchWithFallback"

const dummyStokProduk: StokProduk[] = [
  {
    id: 1,
    nama: "Aqua",
    kategori: "Minuman",
    hargaJual: 10000,
    stok: 20,
    status: "aktif",
    gambar: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    nama: "Chitato",
    kategori: "Makanan",
    hargaJual: 10000,
    stok: 20,
    status: "aktif",
    gambar: "https://via.placeholder.com/150",
  },
]

export async function getStokProduk(): Promise<StokProduk[]> {
  return fetchWithFallback<StokProduk[]>("/api/stokProduk", dummyStokProduk)
}
