import { PrismaClient } from "@prisma/client"

import { NextResponse, NextRequest } from "next/server"
export const fetchCache = "force-no-store"
export const revalidate = 0

import { type IResponseOffers } from "@/services/offers/types"

const prisma = new PrismaClient()

interface IParams {
  id: string | number
}

export async function POST(request: NextRequest, context: { params: IParams }) {
  const data: IResponseOffers = await request.json()

  await prisma.offer.create({
    data: {
      idOffer: Number(context.params.id),
    },
  })
  prisma.$disconnect()

  return NextResponse.json(data)
}
