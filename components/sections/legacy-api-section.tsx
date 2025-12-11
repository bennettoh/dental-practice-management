import { Database } from "lucide-react";
import { FetchLegacyDemo } from "../fetch-legacy-demo";
import { CodePreview } from "../code-preview";

export const LegacyApiSection = () => {
  return (
    <section className="max-w-5xl mx-auto mb-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Database className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Legacy Source (Layer A)
          </h2>
          <p className="text-gray-500">
            Simulating inconsistent schemas found in older systems like Dentrix
            or SoftDent.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Visual Card */}
        <FetchLegacyDemo />

        {/* Code Preview Area */}
        <CodePreview
          title="GET /mock-external-api/slots"
          content={`export const GET = async () => {
  const dirtyData = [
    {
      AptNum: 101,
      AptDateTime: "2025-07-20T09:00:00",
      ProvNum: "DDS1",
      Duration: 30,
    },
    {
      appointment_id: "999",
      start_time: "07/21/2025 10:00 AM",
      provider_id: "HYG2",
      length_min: 60,
    },
  ];
  
  return new Response(JSON.stringify(dirtyData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
`}
        />
      </div>
    </section>
  );
};
