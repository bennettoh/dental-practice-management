import { CleanApiDemo } from "@/components/clean-api-demo";
import { Server } from "lucide-react";

export const CleanApiSection = () => {
  return (
    <section className="max-w-5xl mx-auto mb-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Server className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Clean API (Layer B)
          </h2>

          <p className="text-gray-500">
            The "Internal" endpoint returning the standardized Output Schema.
          </p>
        </div>
      </div>

      <CleanApiDemo />
    </section>
  );
};
