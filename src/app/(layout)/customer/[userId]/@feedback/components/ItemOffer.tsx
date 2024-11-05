"use client"

import { useQuery } from "@tanstack/react-query"

import AOffer from "./AOffer"
import IconReAccent from "@/components/icons/IconReAccent"

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

  return (
    <div className="w-full grid items-center grid-cols-[1rem_minmax(0,1fr)] gap-2.5">
      <div className="w-4 h-4 relative p-2 flex items-center justify-center *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
        <IconReAccent />
      </div>
      <AOffer offer={offer!} />
    </div>
  )
}

ItemOffer.displayName = "ItemOffer"
export default ItemOffer
