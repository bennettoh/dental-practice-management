import { Layers } from "lucide-react";
import { CodePreview } from "../code-preview";

export const AdapterLogicSection = () => {
  return (
    <section className="max-w-5xl mx-auto mb-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Layers className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Adapter Logic (Middleware)
          </h2>

          <p className="text-gray-500">
            Normalizing Time Zones to UTC, Mapping Providers, and Standardizing
            Fields.
          </p>
        </div>
      </div>

      <div className="relative bg-white rounded-xl border border-gray-200 shadow-sm p-8 overflow-hidden">
        {/* Logic Visualization */}
        <div className="space-y-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Step 1: Normalize Field Name
              </span>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gray-800 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-600">
                Before we can get to the values, we must first take a look at
                the field keys. Iterate through the payload and turn the chaotic
                casing to the kind we want - snake_case.
              </p>
            </div>
            <div className="col-span-2">
              <CodePreview
                title="lib/normalize-keys.ts"
                content={`export function normalizeKeys(obj: Slot) {
    const out: Slot = {};

    for (const [key, value] of Object.entries(obj)) {
        const normalized = key
        .replace(/([a-z0-9])([A-Z])/g, "$1_$2") // camelCase → camel_case
        .replace(/-/g, "_") // hyphens → underscores
        .toLowerCase();

        out[normalized] = value.toString();
    }

    return out;
}
`}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Step 2: Parse Data
              </span>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-sm text-gray-600">
                Once we got the field names under control, we can normalize the
                fields that come in various formats.
              </p>
              <p className="text-sm text-gray-600">
                Most fields are straight forward - checking whether the string
                value can be converted to number, and see if the provider is in
                the DB, etc.
              </p>
            </div>
            <div className="col-span-2">
              <CodePreview
                title="lib/transform-slots.ts"
                content={`const normalizeSlot = (raw: Slot) => {
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
`}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Step 3: UTC Date Conversion
              </span>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-0 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-600">
                For simplicity, we will use the Date object provided by
                JavaScript API to handle date strings, since it is able to
                handle most common date formats.
              </p>
              <p className="text-sm text-gray-600">
                One thing to point out in this implementation is that UTC time
                value will depend on the exact time zone the information has
                been entered for. For now, we assume default behavior.
              </p>
            </div>
            <div className="col-span-2">
              <CodePreview
                title="lib/transform-slots.ts"
                content={`const extractEndTime = (slot: Slot) => {
    const start = extractStartTime(slot);
    if (!start) return null;

    const duration = extractDurationMinutes(slot);
    if (isNaN(duration)) {
        return null;
    }

    const endMS = new Date(start).getTime() + duration * 60000;
    return new Date(endMS).toISOString();
};
`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
