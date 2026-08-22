import { NextResponse } from "next/server";
import { listByStrand, STRAND_META } from "@/lib/skills";

export async function GET() {
  return NextResponse.json({ strands: listByStrand(), strandMeta: STRAND_META });
}
