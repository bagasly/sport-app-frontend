"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field } from "@/types/types"

interface GenericFormDialogProps {
  title: string
  fields: Field[]
  onSubmit: (formData: any) => void
  initialData?: any
  onClose?: () => void
  hideTrigger?: boolean // untuk menyembunyikan tombol trigger (misal untuk edit)
}

export default function GenericFormDialog({
  title,
  fields,
  onSubmit,
  initialData,
  onClose,
  hideTrigger = false,
}: GenericFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    setFormData(initialData || {})
    if (initialData) setOpen(true)
  }, [initialData])

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: string, value: string) => {
    const current = formData[name] || []
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value]

    setFormData((prev: any) => ({ ...prev, [name]: updated }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setOpen(false)
    setFormData({})
    if (onClose) onClose()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen && onClose) onClose()
      }}
    >
      {!hideTrigger && (
        <DialogTrigger asChild>
          <Button variant="default">{initialData ? "Edit" : "+ Tambah"}</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          {fields.map((field) => {
            if (field.type === "text") {
              return (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block font-medium mb-1">
                    {field.label}
                  </label>
                  <Input
                    id={field.name}
                    type="text"
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required
                  />
                </div>
              )
            }

            if (field.type === "coordinate") {
              return (
                <div key={`${field.nameLat}-${field.nameLng}`} className="space-y-2">
                  <p className="font-medium">{field.label}</p>
                  <p className="text-sm text-muted-foreground">
                    Buka Google Maps, klik kanan lokasi & salin lat,lng ke bawah:
                  </p>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    🌍 Buka Google Maps
                  </a>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Latitude"
                      value={formData[field.nameLat] || ""}
                      onChange={(e) => handleChange(field.nameLat, e.target.value)}
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Longitude"
                      value={formData[field.nameLng] || ""}
                      onChange={(e) => handleChange(field.nameLng, e.target.value)}
                      required
                    />
                  </div>
                </div>
              )
            }

            if (field.type === "checkbox") {
              return (
                <div key={field.name}>
                  <p className="font-medium mb-2">{field.label}</p>
                  <div className="flex flex-col gap-1">
                    {field.options.map((option) => (
                      <label key={option.value} className="flex items-center gap-2">
                        <Checkbox
                          checked={(formData[field.name] || []).includes(option.value)}
                          onCheckedChange={() =>
                            handleCheckboxChange(field.name, option.value)
                          }
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              )
            }

            if (field.type === "select") {
              return (
                <div key={field.name}>
                  <p className="font-medium mb-2">{field.label}</p>
                  <Select
                    value={formData[field.name] || ""}
                    onValueChange={(value) => handleChange(field.name, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder || field.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.length === 0 ? (
                        <SelectItem value="" disabled>
                          Tidak ada pilihan tersedia
                        </SelectItem>
                      ) : (
                        field.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )
            }

            return null
          })}

          <DialogFooter className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false)
                if (onClose) onClose()
              }}
            >
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
