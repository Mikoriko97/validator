import { NextResponse } from "next/server"
import { fetchValidatorDetails } from "@/lib/validator-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`API: Fetching validator details for ${params.id}`)
    const validator = await fetchValidatorDetails(params.id)

    if (!validator) {
      console.log(`API: Validator ${params.id} not found`)
      return NextResponse.json({ error: "Validator not found", success: false }, { status: 404 })
    }

    console.log(`API: Successfully fetched validator ${params.id}`)
    return NextResponse.json({
      ...validator,
      success: true,
    })
  } catch (error) {
    console.error(`API Error fetching validator ${params.id}:`, error)
    return NextResponse.json(
      {
        error: "Failed to fetch validator details",
        success: false,
      },
      { status: 500 },
    )
  }
}
