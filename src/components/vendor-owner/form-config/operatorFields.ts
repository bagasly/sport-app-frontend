// lib/form-fields/operatorFields.ts
import { Field } from "@/types/types"

export const getOperatorFormFields: Field[] = [
  { name: "nama", label: "Nama", type: "text", placeholder: "Masukkan nama" },
  { name: "username", label: "Username", type: "text", placeholder: "Masukkan username" },
  { name: "email", label: "Email", type: "text", placeholder: "Masukkan email" },
  { name: "noHp", label: "No HP", type: "text", placeholder: "Masukkan nomor HP" },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: [
      { label: "Manager", value: "manager" },
      { label: "Kasir", value: "kasir" },
    ],
  },
]
