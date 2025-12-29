import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    const body = await req.json();
    const id = uuidv4();
    // Set TTL to 24 hours (86400 seconds)
    await redis.set(`secret:${id}`, JSON.stringify(body), { ex: 86400 });
    return NextResponse.json({ id });
}
