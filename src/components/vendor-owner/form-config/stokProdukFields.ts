import { Field } from "@/types/types";

export const getStokProdukFormFields: Field[] = [
  {
    name: "nama",
    label: "Nama",
    type: "text",
    placeholder: "Masukkan nama produk",
  },
  {
    name: "kategori",
    label: "Kategori",
    type: "select",
    options: [
      { label: "Makanan", value: "makanan" },
      { label: "Minuman", value: "minuman" },
    ],
  },
  {
    name: "hargaJual",
    label: "Harga Jual",
    type: "text",
  },
  {
    name: "stok",
    label: "Stok",
    type: "text",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Aktif", value: "aktif" },
      { label: "Tidak Aktif", value: "tidakAktif" },
    ],
  },
  {
    name: "gambar",
    label: "Gambar",
    type: "image",
  },
];
