import { redirect } from "next/navigation"

import RedirectOffer from "../components/RedirectOffer"

import { getIdOffer } from "@/services"

export default async ({ params }: { params: { id: string } }) => {
  const { id } = params ?? {}
  if (!id) return redirect("/")

  const { data: offer } = await getIdOffer(id)

  if (offer) {
    return <RedirectOffer offer={offer} />
  } else {
    return redirect("/")
  }
}
