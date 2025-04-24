import { Manager } from "@/types/manager"
import { fetchWithFallback } from "./fetchWithFallback"

const dummyManagers: Manager[] = [
  { id: 1, nama: "Andi" },
  { id: 2, nama: "Budi" },
  { id: 3, nama: "Cici" },
]

export async function getManagers(): Promise<Manager[]> {
  return fetchWithFallback<Manager[]>("/api/manager", dummyManagers)
}
