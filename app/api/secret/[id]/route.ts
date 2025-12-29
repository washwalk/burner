import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const key = `secret:${params.id}`;
    const data = await redis.get(key);
    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await redis.del(key); // The "Burn"
    return NextResponse.json(data);
}
