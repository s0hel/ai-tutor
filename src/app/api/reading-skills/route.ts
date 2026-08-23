import { NextResponse } from "next/server";
import { listReadingByStrand, READING_STRAND_META } from "@/lib/reading";

export async function GET() {
  return NextResponse.json({ strands: listReadingByStrand(), strandMeta: READING_STRAND_META });
}
