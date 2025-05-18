export async function fetchWithFallback<T>(
  apiUrl: string,
  dummyData: T
): Promise<T> {
  try {
    const res = await fetch(apiUrl, { cache: "no-store" })

    if (!res.ok) {
      throw new Error(`Fetch gagal: ${res.statusText}`)
    }

    const json = await res.json()

    // Ensure the correct data structure is returned (if it's directly on json or json.data)
    return json.data ? (json.data as T) : (json as T)
  } catch (error) {
    console.error("Error fetchWithFallback:", error)
    return dummyData
  }
}
