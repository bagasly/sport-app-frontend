import { Field } from "@/types/types"
import { Manager } from "@/types/manager"

export function getCabangFormFields(managers: Manager[]): Field[] {
  return [
    { type: "text", name: "nama", label: "Nama Cabang", placeholder: "Nama Cabang" },
    { type: "text", name: "lokasi", label: "Lokasi", placeholder: "Alamat Lengkap" },
    { type: "coordinate", nameLat: "lat", nameLng: "lng", label: "Koordinat" },
    {
      type: "select", 
      name: "manager",
      label: "Pilih Manager",
      placeholder: "Pilih Manager",
      options: managers.map((m) => ({ label: m.nama, value: String(m.id) })),
    },
  ]
}
