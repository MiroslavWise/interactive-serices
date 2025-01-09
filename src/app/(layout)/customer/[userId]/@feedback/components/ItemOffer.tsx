"use client"

import { useQuery } from "@tanstack/react-query"

import AOffer from "./AOffer"

import { getIdOffer } from "@/services"

interface IProps {
  idOffer: string | number
}

function ItemOffer({ idOffer }: IProps) {
  const { data } = useQuery({
    queryFn: () => getIdOffer(idOffer),
    queryKey: ["offers", { offerId: idOffer }],
    enabled: !!idOffer,
  })

  const { data: offer } = data ?? {}

  return <AOffer offer={offer!} />
}

ItemOffer.displayName = "ItemOffer"
export default ItemOffer
