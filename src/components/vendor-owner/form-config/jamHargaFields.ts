import { Field } from "@/types/types"
import { getDaftarLapangan } from "@/lib/api/daftarLapangan"

export async function getJamHargaFormFields(): Promise<Field[]> {
  const lapangan = await getDaftarLapangan()

  return [
    {
      name: "tempat",
      label: "Nama Lapangan",
      type: "select",
      options: lapangan.map((lap) => ({
        label: lap.nama,
        value: lap.nama,
      })),
      placeholder: "Pilih lapangan",
    },
    {
      name: "hari",
      label: "Hari",
      type: "multiselect",
      options: [
        { label: "Senin", value: "Senin" },
        { label: "Selasa", value: "Selasa" },
        { label: "Rabu", value: "Rabu" },
        { label: "Kamis", value: "Kamis" },
        { label: "Jumat", value: "Jumat" },
        { label: "Sabtu", value: "Sabtu" },
        { label: "Minggu", value: "Minggu" },
      ],
      placeholder: "Pilih hari",
    },
    {
      name: "jamBuka",
      label: "Jam Buka",
      type: "time",
    },
    {
      name: "jamTutup",
      label: "Jam Tutup",
      type: "time",
    },
    {
      name: "harga",
      label: "Harga per Jam",
      type: "text",
      placeholder: "Contoh: 150000",
    },
  ]
}
