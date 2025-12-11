"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export const FetchLegacyDemo = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<number>();

  const handleClick = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/mock-external-api/slots`);
    setStatus(res.status);

    if (res.ok) {
      const data = await res.json();
      setResponse(data);
    } else {
      alert("Something went wrong. Please try again later.");
    }

    setIsLoading(false);
  };

  const handleClear = () => {
    setResponse(null);
    setStatus(undefined);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6 flex flex-col justify-between h-124 space-y-4">
      <div>
        <h3 className="font-medium text-gray-900 mb-2">
          Incoming "Chaos" Data
        </h3>
        <p className="text-sm text-gray-500">
          Notice the mixed casing (PascalCase vs snake_case), proprietary IDs
          ("DDS1"), and varying date formats.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <Button size="sm" onClick={handleClick} disabled={isLoading}>
          Fetch Legacy Data
        </Button>
        {status === 200 ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase">
            Status: {status} OK
          </span>
        ) : status !== undefined ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 uppercase">
            Status: {status}
          </span>
        ) : null}
      </div>
      <div className="bg-gray-50 rounded-lg border border-gray-100 p-4 font-mono text-xs text-gray-600 overflow-auto flex-grow">
        <pre>{response === null ? "Click 'Fetch Legacy Data' to simulate an API call" : JSON.stringify(response, null, 2)}</pre>
      </div>
      <Button variant="outline" onClick={handleClear}>
        Clear
      </Button>
    </div>
  );
};
