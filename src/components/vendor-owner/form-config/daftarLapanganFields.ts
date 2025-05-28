import { Field } from "@/types/types";

export const getDaftarLapanganFormFields: Field[] = [
  {
    name: "nama",
    label: "Nama",
    type: "text",
    placeholder: "Masukkan nama lapangan",
  },
  {
    name: "cabangOlahraga",
    label: "Cabang Olahraga",
    type: "select",
    options: [
      { label: "Futsal", value: "futsal" },
      { label: "Mini Soccer", value: "Mini Soccer" },
    ],
  },
  {
    name: "jenisLantai",
    label: "Jenis Lantai",
    type: "select",
    options: [
      { label: "Rumput Sintetis", value: "Rumput Sintetis" },
      { label: "Vinyl", value: "vinyl" },
    ],
  },
  {
    name: "open",
    label: "Jam Buka",
    type: "time",
    placeholder: "Pilih jam buka",
  },
  {
    name: "close",
    label: "Jam Tutup",
    type: "time",
    placeholder: "Pilih jam tutup",
  },
  {
    name: "gambar",
    label: "Gambar",
    type: "image",
  },
];
