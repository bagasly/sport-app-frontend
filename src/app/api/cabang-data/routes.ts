// src/app/api/cabang-data/routes.ts

import { NextResponse } from "next/server";

// Data dummy untuk cabang
const cabangData = [
  {
    id: 1,
    nama: "Orion Sport Center - Purwokerto",
    lat: -7.678269,
    lng: 109.653957,
    manager: ["Ikrom", "Dimas"],
  },
  {
    id: 2,
    nama: "Orion Sport Center - Yogyakarta",
    lat: -7.797068,
    lng: 110.370529,
    manager: ["Bagas"],
  },
];

// API handler untuk mendapatkan data cabang
export async function GET() {
  // Mengembalikan data cabang dalam bentuk JSON
  return NextResponse.json(cabangData);
}
