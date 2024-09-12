import { getGeocodeSearch } from "@/services"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const queryName = request?.nextUrl?.searchParams.get("name")
  const responseGeo = await getGeocodeSearch(queryName!)

  return NextResponse.json(
    {
      data: responseGeo,
    },
    { status: 200 },
  )
}
