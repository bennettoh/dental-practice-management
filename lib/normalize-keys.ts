import { Slot } from "@/types/slot-type";

export function normalizeKeys(obj: Slot) {
  const out: Slot = {};

  for (const [key, value] of Object.entries(obj)) {
    // Convert to snake_case
    const normalized = key
      .replace(/([a-z0-9])([A-Z])/g, "$1_$2") // camelCase → camel_case
      .replace(/-/g, "_") // hyphens → underscores
      .toLowerCase();

    out[normalized] = value.toString();
  }

  return out;
}
