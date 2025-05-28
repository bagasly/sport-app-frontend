"use client"

import { useEffect, useState } from "react"
import { StokProduk } from "@/types/stokProduk"
import { getStokProduk } from "@/lib/api/stokProduk"
import { GenericTable, Column } from "@/components/vendor-owner/generic-table"
import { Button } from "@/components/ui/button"
import GenericFormDialog from "@/components/vendor-owner/generic-form"
import { getStokProdukFormFields } from "@/components/vendor-owner/form-config/stokProdukFields"
import { Pencil, Trash2 } from "lucide-react"

export default function StokProdukPage() {
    const [dataStokProduk, setDataStokProduk] = useState<StokProduk[]>([])

    // State untuk edit
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [editInitialData, setEditInitialData] = useState<any>(null)

    useEffect(() => {
        getStokProduk().then(setDataStokProduk)
    }, [])

    const handleDelete = (index: number) => {
        const updated = [...dataStokProduk]
        updated.splice(index, 1)
        setDataStokProduk(updated)
    }

    const handleAddStokProduk = (newStokProduk: {
        nama: string;
        kategori: string;
        hargaJual: number;
        stok: number;
        status: string;
        gambar: string;
    }) => {
        const newItem: StokProduk = {
            id: dataStokProduk.length ? Math.max(...dataStokProduk.map((d) => d.id)) + 1 : 1,
            nama: newStokProduk.nama,
            kategori: newStokProduk.kategori,
            hargaJual: newStokProduk.hargaJual,
            stok: newStokProduk.stok,
            status: newStokProduk.status,
            gambar: newStokProduk.gambar,
        }

        setDataStokProduk((prev) => [...prev, newItem])
    }

    const handleEditStokProduk = (newData: {
        nama: string;
        kategori: string;
        hargaJual: number;
        stok: number;
        status: string;
        gambar: string;
    }) => {
        if (editIndex === null) return

        const updatedStokProduk: StokProduk = {
            id: dataStokProduk[editIndex].id,
            nama: newData.nama,
            kategori: newData.kategori,
            hargaJual: newData.hargaJual,
            stok: newData.stok,
            status: newData.status,
            gambar: newData.gambar,
        }

        const updatedList = [...dataStokProduk]
        updatedList[editIndex] = updatedStokProduk
        setDataStokProduk(updatedList)

        // Reset edit state
        setEditIndex(null)
        setEditInitialData(null)
    }

    const openEditDialog = (index: number) => {
        const StokProduk = dataStokProduk[index]
        setEditInitialData({
            nama: StokProduk.nama,
            kategori: StokProduk.kategori,
            hargaJual: StokProduk.hargaJual,
            stok: StokProduk.stok,
            status: StokProduk.status,
            gambar: StokProduk.gambar,
        })
        setEditIndex(index)
    }

    const columns: Column<StokProduk>[] = [
        {
            key: "gambar",
            label: "Gambar",
            render: (value: string) =>
                value ? (
                    <img
                        src={value}
                        alt="Gambar Produk"
                        className="w-16 h-16 object-cover rounded border"
                    />
                ) : (
                    "-"
                ),
        },
        { key: "nama", label: "Nama" },
        { key: "kategori", label: "Kategori" },
        {
            key: "hargaJual",
            label: "Harga Jual",
            render: (val) => `Rp${Number(val).toLocaleString("id-ID")}`,
        },
        { key: "stok", label: "Stok" },
        { key: "status", label: "Status" },
        {
            key: "aksi",
            label: "Aksi",
            render: (_: any, __: StokProduk, rowIndex: number) => (
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
                    <h1 className="text-2xl font-bold">Daftar Produk</h1>
                    <GenericFormDialog
                        title="Tambah Produk Baru"
                        fields={getStokProdukFormFields}
                        onSubmit={handleAddStokProduk}
                    />
                </div>

                <GenericTable columns={columns} data={dataStokProduk} />

                {/* Edit Dialog */}
                {editInitialData && (
                    <GenericFormDialog
                        title="Edit Daftar Produk"
                        fields={getStokProdukFormFields}
                        onSubmit={handleEditStokProduk}
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
