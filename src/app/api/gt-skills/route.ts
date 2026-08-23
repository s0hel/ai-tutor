import { NextResponse } from "next/server";
import { listByBattery, BATTERY_META } from "@/lib/gifted";

export async function GET() {
  return NextResponse.json({ batteries: listByBattery(), batteryMeta: BATTERY_META });
}
