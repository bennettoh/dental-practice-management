export const GET = async () => {
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
