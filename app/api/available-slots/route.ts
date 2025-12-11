import { transformSlots } from "@/lib/transform-slots";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const cleanData = transformSlots(body);

  return new Response(JSON.stringify(cleanData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
