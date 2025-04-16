"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Menambahkan tipe untuk manager
interface Manager {
  id: string;
  nama: string;
}

interface Cabang {
  nama: string;
  lat: number;
  lng: number;
  manager: string[];
  lokasi: string;
}

export default function CabangPage() {
  const [dataCabang, setDataCabang] = useState<Cabang[]>([]);
  const [nama, setNama] = useState("");
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [lokasi, setLokasi] = useState<string>("");
  const [selectedManagers, setSelectedManagers] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [managers, setManagers] = useState<Manager[]>([]);

  useEffect(() => {
    // Fetch data operator
    fetch("/api/operator-data")
      .then((response) => response.json())
      .then((data) => {
        const filteredManagers = data.filter(
          (operator: any) => operator.role === "manager"
        );
        setManagers(filteredManagers);
      })
      .catch((error) => console.error("Error fetching operators:", error));

    // Dummy data cabang
    setDataCabang([
      {
        nama: "Orion Sport Center - Purwokerto",
        lat: -7.678269,
        lng: 109.653957,
        manager: ["Ikrom", "Dimas"],
        lokasi: "Purwokerto",
      },
      {
        nama: "Orion Sport Center - Yogyakarta",
        lat: -7.797068,
        lng: 110.370529,
        manager: ["Bagas"],
        lokasi: "Yogyakarta",
      },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      alert("Koordinat tidak valid.");
      return;
    }

    const newCabang: Cabang = {
      nama,
      lat: parsedLat,
      lng: parsedLng,
      manager: selectedManagers,
      lokasi,
    };

    setDataCabang([...dataCabang, newCabang]);

    // Reset form
    setNama("");
    setLat("");
    setLng("");
    setLokasi("");
    setSelectedManagers([]);
    setDialogOpen(false);
  };

  const handleDelete = (index: number) => {
    const updated = [...dataCabang];
    updated.splice(index, 1);
    setDataCabang(updated);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Halaman Cabang</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default">+ Tambah Cabang</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Cabang Baru</DialogTitle>
            </DialogHeader>

            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Nama Cabang"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />

              <Input
                type="text"
                placeholder="Lokasi Cabang"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                required
              />

              <div className="space-y-2">
                <p className="font-medium">Pilih Lokasi (Koordinat)</p>
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
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Longitude"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">Pilih Manager:</p>
                <div className="space-y-2 max-h-40 overflow-y-auto border p-2 rounded-md">
                  {managers.map((manager) => (
                    <div
                      key={manager.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={`manager-${manager.id}`}
                        value={manager.nama}
                        checked={selectedManagers.includes(manager.nama)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedManagers([
                              ...selectedManagers,
                              manager.nama,
                            ]);
                          } else {
                            setSelectedManagers(
                              selectedManagers.filter(
                                (m) => m !== manager.nama
                              )
                            );
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <label htmlFor={`manager-${manager.id}`} className="text-sm">
                        {manager.nama}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Simpan
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Cabang</TableHead>
            <TableHead>Koordinat</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Map</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataCabang.map((cabang, index) => (
            <TableRow key={index}>
              <TableCell>{cabang.nama}</TableCell>
              <TableCell>
                {cabang.lat}, {cabang.lng}
              </TableCell>
              <TableCell>{cabang.lokasi}</TableCell>
              <TableCell>{cabang.manager.join(", ")}</TableCell>
              <TableCell>
                <iframe
                  src={`https://www.google.com/maps?q=${cabang.lat},${cabang.lng}&z=15&output=embed`}
                  width="250"
                  height="150"
                  className="rounded-md border"
                  loading="lazy"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
