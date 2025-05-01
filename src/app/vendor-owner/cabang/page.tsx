"use client"

import { useEffect, useState } from "react"
import { Cabang } from "@/types/cabang"
import { getCabang } from "@/lib/api/cabang"
import { getManagers } from "@/lib/api/manager"
import { GenericTable, Column } from "@/components/vendor-owner/generic-table"
import { Button } from "@/components/ui/button"
import GenericFormDialog from "@/components/vendor-owner/generic-form"
import { getCabangFormFields } from "@/components/vendor-owner/form-config/cabangFields"
import { Pencil, Trash2 } from "lucide-react"

export default function CabangPage() {
  const [dataCabang, setDataCabang] = useState<Cabang[]>([])
  const [managers, setManagers] = useState<{ id: number; nama: string }[]>([])

  // State untuk edit
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editInitialData, setEditInitialData] = useState<any>(null)

  useEffect(() => {
    getCabang().then(setDataCabang)
    getManagers().then(setManagers)
  }, [])

  const handleDelete = (index: number) => {
    const updated = [...dataCabang]
    updated.splice(index, 1)
    setDataCabang(updated)
  }

  const handleAddCabang = (newCabang: {
    nama: string
    lokasi: string
    lat: string
    lng: string
    manager: string
  }) => {
    const selectedManager = managers.find((m) => String(m.id) === newCabang.manager)

    const newItem: Cabang = {
      nama: newCabang.nama,
      lokasi: newCabang.lokasi,
      lat: parseFloat(newCabang.lat),
      lng: parseFloat(newCabang.lng),
      manager: selectedManager ? [selectedManager.nama] : [],
    }

    setDataCabang((prev) => [...prev, newItem])
  }

  const handleEditCabang = (newData: {
    nama: string
    lokasi: string
    lat: string
    lng: string
    manager: string
  }) => {
    if (editIndex === null) return

    const selectedManager = managers.find((m) => String(m.id) === newData.manager)

    const updatedCabang: Cabang = {
      nama: newData.nama,
      lokasi: newData.lokasi,
      lat: parseFloat(newData.lat),
      lng: parseFloat(newData.lng),
      manager: selectedManager ? [selectedManager.nama] : [],
    }

    const updatedList = [...dataCabang]
    updatedList[editIndex] = updatedCabang
    setDataCabang(updatedList)

    // Reset edit state
    setEditIndex(null)
    setEditInitialData(null)
  }

  const openEditDialog = (index: number) => {
    const cabang = dataCabang[index]
    const managerId = managers.find((m) => m.nama === cabang.manager[0])?.id

    setEditInitialData({
      nama: cabang.nama,
      lokasi: cabang.lokasi,
      lat: String(cabang.lat),
      lng: String(cabang.lng),
      manager: managerId ? String(managerId) : "",
    })
    setEditIndex(index)
  }

  const columns: Column<Cabang>[] = [
    { key: "nama", label: "Nama Cabang" },
    { key: "koordinat", label: "Koordinat", render: (_: any, row) => `${row.lat}, ${row.lng}` },
    { key: "lokasi", label: "Lokasi" },
    { key: "manager", label: "Manager", render: (val) => val.join(", ") },
    {
      key: "map",
      label: "Map",
      render: (_: any, row) => (
        <iframe
          src={`https://www.google.com/maps?q=${row.lat},${row.lng}&z=15&output=embed`}
          width="250"
          height="150"
          className="rounded-md border"
          loading="lazy"
        />
      ),
    },
    {
      key: "aksi",
      label: "Aksi",
      render: (_: any, __: Cabang, rowIndex: number) => (
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
    }
  ]

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Cabang</h1>
          <GenericFormDialog
            title="Tambah Cabang Baru"
            fields={getCabangFormFields(managers)}
            onSubmit={handleAddCabang}
          />
        </div>

        <GenericTable columns={columns} data={dataCabang} />

        {/* Edit Dialog */}
        {editInitialData && (
          <GenericFormDialog
            title="Edit Cabang"
            fields={getCabangFormFields(managers)}
            onSubmit={handleEditCabang}
            initialData={editInitialData}
            onClose={() => {
              setEditIndex(null)
              setEditInitialData(null)
            }}
            hideTrigger
          />
        )}
      </div>
    </>
  )
}
