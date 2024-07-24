import { redirect } from "next/navigation"

import RedirectOffer from "./components/RedirectOffer"

import { getIdOffer } from "@/services"
import { decryptedOffer } from "@/helpers/cript"

export default async ({ params }: { params: { hash: string } }) => {
  const { hash } = params ?? {}

  const id = decryptedOffer(hash)

  const { data: offer } = await getIdOffer(id)

  if (offer) {
    fetch(`http://localhost:3000/api/offer/${id}`, {
      method: "POST",
      body: JSON.stringify(offer),
    })

    return <RedirectOffer offer={offer} />
  } else {
    return redirect("/")
  }
}
