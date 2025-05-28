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
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field } from "@/types/types"
import ReactSelect from "react-select"

interface GenericFormDialogProps {
  title: string
  fields: Field[]
  onSubmit: (formData: any) => void
  initialData?: any
  onClose?: () => void
  hideTrigger?: boolean
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
          {fields.map((field, index) => {
            if (field.type === "text") {
              const value = formData[field.name] ?? ""
              return (
                <div key={index}>
                  <label className="block font-medium mb-1">{field.label}</label>
                  <Input
                    type="text"
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required
                  />
                </div>
              )
            }

            if (field.type === "coordinate") {
              const lat = formData[field.nameLat] ?? ""
              const lng = formData[field.nameLng] ?? ""
              return (
                <div key={index} className="space-y-2">
                  <p className="font-medium">{field.label}</p>
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
                      placeholder="Latitude"
                      value={lat}
                      onChange={(e) => handleChange(field.nameLat, e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Longitude"
                      value={lng}
                      onChange={(e) => handleChange(field.nameLng, e.target.value)}
                      required
                    />
                  </div>
                </div>
              )
            }

            if (field.type === "checkbox") {
              const value = formData[field.name] ?? []
              return (
                <div key={index}>
                  <p className="font-medium mb-2">{field.label}</p>
                  <div className="flex flex-col gap-1">
                    {field.options.map((option) => (
                      <label key={option.value} className="flex items-center gap-2">
                        <Checkbox
                          checked={value.includes(option.value)}
                          onCheckedChange={() => handleCheckboxChange(field.name, option.value)}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              )
            }

            if (field.type === "select") {
              const value = formData[field.name] ?? ""
              return (
                <div key={index}>
                  <p className="font-medium mb-2">{field.label}</p>
                  <ShadSelect
                    value={value}
                    onValueChange={(val) => handleChange(field.name, val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder || field.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </ShadSelect>
                </div>
              )
            }

            if (field.type === "multiselect") {
              const selectedValues: string[] = formData[field.name] ?? []
              const options = field.options.map((opt) => ({
                value: opt.value,
                label: opt.label,
              }))
              const selected = options.filter((opt) => selectedValues.includes(opt.value))

              return (
                <div key={index}>
                  <label className="block font-medium mb-1">{field.label}</label>
                  <ReactSelect
                    isMulti
                    options={options}
                    value={selected}
                    onChange={(selectedOptions) =>
                      handleChange(
                        field.name,
                        selectedOptions.map((opt) => opt.value)
                      )
                    }
                    placeholder={field.placeholder || "Pilih opsi"}
                  />
                </div>
              )
            }

            if (field.type === "time") {
              const value = formData[field.name] ?? ""
              return (
                <div key={index}>
                  <label className="block font-medium mb-1">{field.label}</label>
                  <Input
                    type="time"
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required
                  />
                </div>
              )
            }

            if (field.type === "image") {
              const imageUrl = formData[field.name] ?? ""

              const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0]
                if (!file) return
                const url = URL.createObjectURL(file)
                handleChange(field.name, url)
              }

              return (
                <div key={index}>
                  <label className="block font-medium mb-1">{field.label}</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block mb-2"
                  />
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md border border-gray-300"
                    />
                  )}
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
