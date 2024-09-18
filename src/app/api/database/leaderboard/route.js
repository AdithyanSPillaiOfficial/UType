import { NextResponse } from "next/server";
import { getAllObjects } from "../db";

export async function POST() {
    const data = await getAllObjects();
    return NextResponse.json({leaderboard : data});
}