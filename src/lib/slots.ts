const KEY = "ausapi-slots";

export function readSlots(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((x) => typeof x === "string").slice(0, 3) : [];
  } catch {
    return [];
  }
}

export function writeSlots(ids: string[]) {
  localStorage.setItem(KEY, JSON.stringify(ids.slice(0, 3)));
}

export function addSlot(id: string) {
  const cur = readSlots().filter((x) => x !== id);
  writeSlots([...cur, id].slice(-3));
}
