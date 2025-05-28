import { NextResponse } from "next/server"
import { StokProduk } from "@/types/stokProduk"

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

export async function GET() {
  try {
    const res = await fetch("http://localhost:3001/api/stokProduk", {
      cache: "no-store",
    })

    if (!res.ok) throw new Error("Backend error")

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Gagal ambil data operator dari backend, fallback dummy:", error)
    return NextResponse.json(dummyStokProduk)
  }
}
