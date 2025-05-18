// lib/api/operator.ts
import { Operator } from "@/types/operator"
import { fetchWithFallback } from "./fetchWithFallback"

const dummyOperators: Operator[] = [
  {
    id: 1,
    nama: "Rina",
    username: "rina123",
    email: "rina@example.com",
    noHp: "081234567890",
    role: "manager",
  },
  {
    id: 2,
    nama: "Budi",
    username: "budiop",
    email: "budi@example.com",
    noHp: "089876543210",
    role: "kasir",
  },
]

export async function getOperator(): Promise<Operator[]> {
  return fetchWithFallback<Operator[]>("/api/operator", dummyOperators)
}
