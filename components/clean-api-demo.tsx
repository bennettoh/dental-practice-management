"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const TEST_DATA = [
  {
    name: "Given example",
    data: [
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
    ],
  },
  {
    name: "Mixed example",
    data: [
      {
        appointment_id: "354234",
        aptDateTime: "2024-07-20T02:00:00",
        provider_id: "HYG2",
        duration: 120,
      },
    ],
  },
  {
    name: "camelCase example",
    data: [
      {
        aptNum: "11",
        aptDateTime: "07/21/2025 10:00 AM",
        provNum: "DDS1",
        duration: "90",
      },
    ],
  },
  {
    name: "SNAKE_CASE example",
    data: [
      {
        APT_NUM: 12314,
        APT_DATE_TIME: "2025-07-20T09:00:00",
        PROV_NUM: "DDS1",
        DURATION: 20,
      },
    ],
  },
  {
    name: "Lowercase provider name",
    data: [
      {
        apt_num: 12314,
        apt_date_time: "2025-07-20T09:00:00",
        prov_num: "dds1",
        duration: 20,
      },
    ],
  },
  {
    name: "Weird date",
    data: [
      {
        apt_num: 124,
        apt_date_time: "2025/07/07",
        prov_num: "dds1",
        duration: 20,
      },
    ],
  },
];

export const CleanApiDemo = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<number>();
  const [testDataName, setTestDataName] = useState("Given example");
  const testData = TEST_DATA.find((t) => t.name === testDataName);

  const handleClick = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/available-slots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData?.data),
    });
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
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6 flex flex-col justify-between h-124 space-y-4">
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Choose an input</h3>
          <p className="text-sm text-gray-500">
            Try different inputs to see how mixed casing (PascalCase vs
            snake_case), proprietary IDs ("DDS1"), and varying date formats are
            handled.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {TEST_DATA.map((t) => (
            <Badge
              variant={t.name === testDataName ? "default" : "secondary"}
              className="cursor-pointer"
              key={t.name}
              onClick={() => setTestDataName(t.name)}
            >
              {t.name}
            </Badge>
          ))}
        </div>
        <div className="bg-gray-50 rounded-lg border border-gray-100 p-4 font-mono text-xs text-gray-600 overflow-auto flex-grow">
          <pre>{JSON.stringify(testData?.data, null, 2)}</pre>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="grow"
            onClick={handleClick}
            disabled={isLoading}
          >
            Hit the endpoint
          </Button>
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6 flex flex-col h-124">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Standardized Output</h3>
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
          <pre>
            {response === null
              ? "Click 'Hit the endpoint' to simulate the API call"
              : JSON.stringify(response, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
