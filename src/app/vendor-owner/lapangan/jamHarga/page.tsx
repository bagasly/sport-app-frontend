"use client"

import { useEffect, useState } from "react"
import { JamHarga } from "@/types/jamHarga"
import { getJamHarga } from "@/lib/api/jamHarga"
import { getJamHargaFormFields } from "@/components/vendor-owner/form-config/jamHargaFields"
import GenericFormDialog from "@/components/vendor-owner/generic-form"
import { GenericTable, Column } from "@/components/vendor-owner/generic-table"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field } from '@/types/types'

export default function JamHargaPage() {
  const [dataJamHarga, setDataJamHarga] = useState<JamHarga[]>([])

  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editInitialData, setEditInitialData] = useState<any>(null)

  // State untuk fields
  const [fields, setFields] = useState<Field[]>([])

  useEffect(() => {
    getJamHarga().then(setDataJamHarga)

    // Ambil fields async
    async function fetchFields() {
      const f = await getJamHargaFormFields()
      setFields(f)
    }
    fetchFields()
  }, [])

  const handleDelete = (index: number) => {
    const updated = [...dataJamHarga]
    updated.splice(index, 1)
    setDataJamHarga(updated)
  }

  const handleAddJamHarga = (formData: any) => {
    const newItem: JamHarga = {
      id: String(Date.now()),
      tempat: formData.tempat,
      hari: formData.hari,
      jamBuka: formData.jamBuka,
      jamTutup: formData.jamTutup,
      harga: parseInt(formData.harga),
    }

    setDataJamHarga((prev) => [...prev, newItem])
  }

  const handleEditJamHarga = (formData: any) => {
    if (editIndex === null) return

    const updatedItem: JamHarga = {
      ...dataJamHarga[editIndex],
      tempat: formData.tempat,
      hari: formData.hari,
      jamBuka: formData.jamBuka,
      jamTutup: formData.jamTutup,
      harga: parseInt(formData.harga),
    }

    const updatedList = [...dataJamHarga]
    updatedList[editIndex] = updatedItem
    setDataJamHarga(updatedList)

    setEditIndex(null)
    setEditInitialData(null)
  }

  const openEditDialog = (index: number) => {
    const item = dataJamHarga[index]
    setEditInitialData({
      tempat: item.tempat,
      hari: item.hari,
      jamBuka: item.jamBuka,
      jamTutup: item.jamTutup,
      harga: item.harga,
    })
    setEditIndex(index)
  }

  const columns: Column<JamHarga>[] = [
    {
      key: "tempat",
      label: "Tempat",
    },
    {
      key: "hari",
      label: "Hari",
    },
    {
      key: "jam",
      label: "Jam Buka - Tutup",
      render: (_, row) => `${row.jamBuka} - ${row.jamTutup}`,
    },
    {
      key: "harga",
      label: "Harga per Jam",
      render: (val) => `Rp${Number(val).toLocaleString("id-ID")}`,
      align: "right",
    },
    {
      key: "aksi",
      label: "Aksi",
      render: (_: any, __: JamHarga, rowIndex: number) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => openEditDialog(rowIndex)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-800"
            onClick={() => handleDelete(rowIndex)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  // Kalau fields belum siap, bisa tampil loading atau null dulu
  if (fields.length === 0) return <p>Loading form fields...</p>

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Daftar Jam & Harga Lapangan</h1>
        <GenericFormDialog
          title="Tambah Jam Harga Baru"
          fields={fields}
          onSubmit={handleAddJamHarga}
        />
      </div>

      <GenericTable columns={columns} data={dataJamHarga} />

      {editInitialData && (
        <GenericFormDialog
          title="Edit Jam Harga"
          fields={fields}
          onSubmit={handleEditJamHarga}
          initialData={editInitialData}
          onClose={() => {
            setEditIndex(null)
            setEditInitialData(null)
          }}
          hideTrigger
        />
      )}
    </div>
  )
}
