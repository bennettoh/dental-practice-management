import { Slot } from "@/types/slot-type";
import { normalizeKeys } from "./normalize-keys";

const PROVIDER_MAP = {
  dds1: { provider_id: "DDS1", first_name: "John", last_name: "Smith" },
  hyg2: { provider_id: "HYG2", first_name: "Jane", last_name: "Lee" },
};

const PRACTICE_ID = "12345";

const normalizeSlot = (raw: Slot) => {
  const slot = normalizeKeys(raw);
  return {
    appointment_id: extractAppointmentId(slot),
    practice_id: PRACTICE_ID,
    start_time: extractStartTime(slot),
    end_time: extractEndTime(slot),
    status: "Available",
    provider: extractProvider(slot),
  };
};

const extractAppointmentId = (slot: Slot) => {
  return slot.apt_num ?? slot.appointment_id ?? slot.id;
};

const extractProvider = (slot: Slot) => {
  const providerId =
    slot.prov_num ?? slot.provider_id ?? slot.provider ?? "Unknown";

  if (Object.keys(PROVIDER_MAP).includes(providerId.toLowerCase())) {
    return PROVIDER_MAP[providerId.toLowerCase() as keyof typeof PROVIDER_MAP];
  }

  return {
    provider_id: providerId,
    first_name: "Unknown",
    last_name: "Unknown",
  };
};

const extractStartTime = (slot: Slot) => {
  const raw = slot.apt_date_time ?? slot.start_time ?? slot.date ?? null;

  if (!raw) return null;

  // Handle odd formats like "07/21/2025 10:00 AM"
  const d = new Date(raw);
  return d.toISOString();
};

const extractDurationMinutes = (slot: Slot) => {
  return Number(slot.duration ?? slot.length_min ?? 0);
};

const extractEndTime = (slot: Slot) => {
  const start = extractStartTime(slot);
  if (!start) return null;

  const duration = extractDurationMinutes(slot);
  if (isNaN(duration)) {
    return null;
  }

  const endMS = new Date(start).getTime() + duration * 60000;
  return new Date(endMS).toISOString();
};

export const transformSlots = (rawSlots: Slot[]) => {
  const items = rawSlots.map(normalizeSlot);

  return {
    items,
    meta: {
      count: items.length,
      timestamp: new Date().toISOString(),
    },
  };
};
