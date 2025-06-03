import { NextResponse } from "next/server"
import { fetchNetworkStats } from "@/lib/db-service"

export async function GET() {
  try {
    console.log("API: Fetching network stats...")
    const stats = await fetchNetworkStats()
    console.log("API: Network stats:", stats)

    return NextResponse.json({
      stats,
      success: true,
    })
  } catch (error) {
    console.error("API Error fetching network stats:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch network stats",
        success: false,
        stats: null,
      },
      { status: 500 },
    )
  }
}
