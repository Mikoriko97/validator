import { NextResponse } from "next/server"
import { fetchValidators } from "@/lib/db-service"

export async function GET() {
  try {
    console.log("API: Fetching validators...")
    const validators = await fetchValidators()
    console.log(`API: Found ${validators.length} validators`)

    return NextResponse.json({
      validators,
      success: true,
      count: validators.length,
    })
  } catch (error) {
    console.error("API Error fetching validators:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch validators",
        success: false,
        validators: [],
      },
      { status: 500 },
    )
  }
}
