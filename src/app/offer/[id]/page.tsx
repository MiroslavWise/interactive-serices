import { redirect } from "next/navigation"

import RedirectOffer from "./components/RedirectOffer"

import { getIdOffer } from "@/services"

export const dynamicParams = true
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async ({ params: { id } }: { params: { id: string } }) => {
  if (!id) return redirect("/")

  const { data: offer } = await getIdOffer(id)

  if (offer) {
    return <RedirectOffer offer={offer} />
  } else {
    return redirect("/")
  }
}
