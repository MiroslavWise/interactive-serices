import { NextRequest, NextResponse } from "next/server"

import { clg } from "@console"
import { obj } from "./logs"
import env from "@/config/environment"

export async function POST(request: NextRequest) {
  const r = await request.json()
  const urlString = r?.url

  if (typeof urlString === "string") {
    clg("urlString: ", urlString, "warning")
    obj.setCurrent(urlString.replace(env.server.host, ""))
  }

  return NextResponse.json({
    data: obj.url,
  })
}
