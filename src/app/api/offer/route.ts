import { PrismaClient } from "@prisma/client"
import { NextResponse, NextRequest } from "next/server"

export const revalidate = 0
export const fetchCache = "force-no-store"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const offers = await prisma.offer.findMany()
    console.log(offers)
    prisma.$disconnect()

    return NextResponse.json(offers)
  } catch (e) {
    console.log("\x1b[31m error--", e)
    return NextResponse.json({
      error: e,
      text: "NOT CONNECT TO BD PRISMA OFFER",
      status: 415,
    })
  }
}
