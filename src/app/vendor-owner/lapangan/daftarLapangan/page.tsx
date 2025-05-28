"use client"

import { useEffect, useState } from "react"
import { DaftarLapangan } from "@/types/daftarLapangan"
import { getDaftarLapangan } from "@/lib/api/daftarLapangan"
import { GenericTable, Column } from "@/components/vendor-owner/generic-table"
import { Button } from "@/components/ui/button"
import GenericFormDialog from "@/components/vendor-owner/generic-form"
import { getDaftarLapanganFormFields } from "@/components/vendor-owner/form-config/daftarLapanganFields"
import { Pencil, Trash2 } from "lucide-react"

export default function DaftarLapanganPage() {
  const [dataDaftarLapangan, setDataDaftarLapangan] = useState<DaftarLapangan[]>([])

  // State untuk edit
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editInitialData, setEditInitialData] = useState<any>(null)

  useEffect(() => {
    getDaftarLapangan().then(setDataDaftarLapangan)
  }, [])

  const handleDelete = (index: number) => {
    const updated = [...dataDaftarLapangan]
    updated.splice(index, 1)
    setDataDaftarLapangan(updated)
  }

  const handleAddDaftarLapangan = (newDaftarLapangan: {
    nama: string;
    cabangOlahraga: string;
    jenisLantai: string;
    open: string;
    close: string;
    gambar: string;
  }) => {
    const newItem: DaftarLapangan = {
      id: dataDaftarLapangan.length ? Math.max(...dataDaftarLapangan.map((d) => d.id)) + 1 : 1,
      nama: newDaftarLapangan.nama,
      cabangOlahraga: newDaftarLapangan.cabangOlahraga,
      jenisLantai: newDaftarLapangan.jenisLantai,
      open: newDaftarLapangan.open,
      close: newDaftarLapangan.close,
      gambar: newDaftarLapangan.gambar,
    }

    setDataDaftarLapangan((prev) => [...prev, newItem])
  }

  const handleEditDaftarLapangan = (newData: {
    nama: string;
    cabangOlahraga: string;
    jenisLantai: string;
    open: string;
    close: string;
    gambar: string;
  }) => {
    if (editIndex === null) return

    const updatedDaftarLapangan: DaftarLapangan = {
      id: dataDaftarLapangan[editIndex].id,
      nama: newData.nama,
      cabangOlahraga: newData.cabangOlahraga,
      jenisLantai: newData.jenisLantai,
      open: newData.open,
      close: newData.close,
      gambar: newData.gambar,
    }

    const updatedList = [...dataDaftarLapangan]
    updatedList[editIndex] = updatedDaftarLapangan
    setDataDaftarLapangan(updatedList)

    // Reset edit state
    setEditIndex(null)
    setEditInitialData(null)
  }

  const openEditDialog = (index: number) => {
    const DaftarLapangan = dataDaftarLapangan[index]
    setEditInitialData({
      nama: DaftarLapangan.nama,
      cabangOlahraga: DaftarLapangan.cabangOlahraga,
      jenisLantai: DaftarLapangan.jenisLantai,
      open: DaftarLapangan.open,
      close: DaftarLapangan.close,
      gambar: DaftarLapangan.gambar,
    })
    setEditIndex(index)
  }

  const columns: Column<DaftarLapangan>[] = [
    {
      key: "gambar",
      label: "Gambar",
      render: (value: string) =>
        value ? (
          <img
            src={value}
            alt="Gambar Lapangan"
            className="w-16 h-16 object-cover rounded border"
          />
        ) : (
          "-"
        ),
    },
    { key: "nama", label: "Nama" },
    { key: "cabangOlahraga", label: "Cabang Olahraga" },
    { key: "jenisLantai", label: "Jenis Lantai" },
    { key: "open", label: "Buka" },
    { key: "close", label: "Tutup" },
    {
      key: "aksi",
      label: "Aksi",
      render: (_: any, __: DaftarLapangan, rowIndex: number) => (
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


  return (
    <>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Daftar Lapangan</h1>
          <GenericFormDialog
            title="Tambah Lapangan Baru"
            fields={getDaftarLapanganFormFields}
            onSubmit={handleAddDaftarLapangan}
          />
        </div>

        <GenericTable columns={columns} data={dataDaftarLapangan} />

        {/* Edit Dialog */}
        {editInitialData && (
          <GenericFormDialog
            title="Edit Daftar Lapangan"
            fields={getDaftarLapanganFormFields}
            onSubmit={handleEditDaftarLapangan}
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
