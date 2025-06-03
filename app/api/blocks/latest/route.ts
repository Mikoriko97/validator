import { NextResponse } from "next/server"
import { fetchLatestBlocks } from "@/lib/db-service"

export async function GET(request: Request) {
  try {
    // Отримуємо параметр limit з URL
    const url = new URL(request.url)
    const limitParam = url.searchParams.get("limit")
    const limit = limitParam ? Number.parseInt(limitParam, 10) : 10

    // Перевіряємо, що limit є допустимим числом
    if (isNaN(limit) || limit <= 0 || limit > 100) {
      return NextResponse.json(
        {
          error: "Invalid limit parameter. Must be a number between 1 and 100.",
          success: false,
        },
        { status: 400 },
      )
    }

    console.log(`API: Fetching ${limit} latest blocks`)
    const blocks = await fetchLatestBlocks(limit)
    console.log(`API: Found ${blocks.length} blocks`)

    return NextResponse.json({
      blocks,
      success: true,
      count: blocks.length,
    })
  } catch (error) {
    console.error("API Error fetching latest blocks:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch latest blocks",
        success: false,
        blocks: [],
      },
      { status: 500 },
    )
  }
}
