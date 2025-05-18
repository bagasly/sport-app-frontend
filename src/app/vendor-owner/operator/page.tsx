"use client"

import { useEffect, useState } from "react"
import { Operator } from "@/types/operator"
import { getOperator } from "@/lib/api/operator"
import { GenericTable, Column } from "@/components/vendor-owner/generic-table"
import { Button } from "@/components/ui/button"
import GenericFormDialog from "@/components/vendor-owner/generic-form"
import { getOperatorFormFields } from "@/components/vendor-owner/form-config/operatorFields"
import { Pencil, Trash2 } from "lucide-react"

export default function OperatorPage() {
  const [dataOperator, setDataOperator] = useState<Operator[]>([])

  // State untuk edit
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editInitialData, setEditInitialData] = useState<any>(null)

  useEffect(() => {
    getOperator().then(setDataOperator)
  }, [])

  const handleDelete = (index: number) => {
    const updated = [...dataOperator]
    updated.splice(index, 1)
    setDataOperator(updated)
  }

  const handleAddOperator = (newOperator: {
    nama: string
    username: string
    email: string
    noHp: string
    role: string
  }) => {
    const newItem: Operator = {
      id: dataOperator.length ? Math.max(...dataOperator.map((d) => d.id)) + 1 : 1,
      nama: newOperator.nama,
      username: newOperator.username,
      email: newOperator.email,
      noHp: newOperator.noHp,
      role: newOperator.role,
    }

    setDataOperator((prev) => [...prev, newItem])
  }

  const handleEditOperator = (newData: {
    nama: string
    username: string
    email: string
    noHp: string
    role: string
  }) => {
    if (editIndex === null) return

    const updatedOperator: Operator = {
      id: dataOperator[editIndex].id,
      nama: newData.nama,
      username: newData.username,
      email: newData.email,
      noHp: newData.noHp,
      role: newData.role,
    }

    const updatedList = [...dataOperator]
    updatedList[editIndex] = updatedOperator
    setDataOperator(updatedList)

    // Reset edit state
    setEditIndex(null)
    setEditInitialData(null)
  }

  const openEditDialog = (index: number) => {
    const operator = dataOperator[index]
    setEditInitialData({
      nama: operator.nama,
      username: operator.username,
      email: operator.email,
      noHp: operator.noHp,
      role: operator.role,
    })
    setEditIndex(index)
  }

  const columns: Column<Operator>[] = [
    { key: "nama", label: "Nama" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "noHp", label: "No HP" },
    { key: "role", label: "Role" },
    {
      key: "aksi",
      label: "Aksi",
      render: (_: any, __: Operator, rowIndex: number) => (
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
          <h1 className="text-2xl font-bold">Operator</h1>
          <GenericFormDialog
            title="Tambah Operator Baru"
            fields={getOperatorFormFields}
            onSubmit={handleAddOperator}
          />
        </div>

        <GenericTable columns={columns} data={dataOperator} />

        {/* Edit Dialog */}
        {editInitialData && (
          <GenericFormDialog
            title="Edit Operator"
            fields={getOperatorFormFields}
            onSubmit={handleEditOperator}
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
