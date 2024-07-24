import { PrismaClient } from "@prisma/client"

import { NextResponse, NextRequest, userAgent } from "next/server"

export const revalidate = 0
export const fetchCache = "force-no-store"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const cookies = request.cookies.toString()
  const data = await request.json()
  const { device, browser } = userAgent(request)

  try {
    let idBrowser = null
    const findBrowser = await prisma.browser.findFirst({
      where: {
        name: browser?.name!,
        version: browser?.version!,
      },
    })

    if (!findBrowser) {
      const createBrowser = await prisma.browser.create({
        data: {
          name: browser?.name!,
          version: browser?.version!,
        },
      })
      idBrowser = createBrowser.uuid
    } else {
      idBrowser = findBrowser.uuid
    }

    const create = await prisma.sessions.create({
      data: {
        cookies: cookies,
        url: data?.url || "/",
        user_agent: device?.type || "desktop",
        browserId: idBrowser,
      },
    })
    prisma.$disconnect()
    return NextResponse.json(create)
  } catch (e) {}
}

export async function GET(request: NextRequest) {
  try {
    const sessions = await prisma.sessions.findMany({
      select: {
        id: true,
        uuid: true,
        create: true,
        url: true,
        user_agent: true,
        browser: true,
      },
    })
    prisma.$disconnect()
    return NextResponse.json(sessions)
  } catch (e) {
    return NextResponse.json({
      error: e,
      text: "NOT CONNECT TO BD PRISMA SESSIONS",
      status: 415,
    })
  }
}
