"use client"

import { useQuery } from "@tanstack/react-query"

import { ImageCategory } from "@/components/common"

import { getIdOffer } from "@/services"
import { dispatchBallonOffer } from "@/store"

interface IProps {
  idOffer: string | number
}

function ItemOffer({ idOffer }: IProps) {
  const { data } = useQuery({
    queryFn: () => getIdOffer(idOffer),
    queryKey: ["offers", { offerId: idOffer }],
    enabled: !!idOffer,
  })

  const offer = data?.data

  const { category, title = "" } = offer ?? {}
  const { id, slug, provider } = category ?? {}

  function handle() {
    if (offer) {
      dispatchBallonOffer({ offer: offer })
    }
  }

  return (
    <a className="w-full grid gap-1 grid-cols-[1.25rem_minmax(0,1fr)] items-center cursor-pointer" onClick={handle}>
      <div className="w-4 h-4 relative p-2 flex items-center justify-center *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
        <ImageCategory slug={slug!} provider={provider!} />
      </div>
      <p title={title || ""} aria-labelledby={title} className="line-clamp-1 text-ellipsis text-text-primary text-sm font-normal">
        {title || ""}
      </p>
    </a>
  )
}

ItemOffer.displayName = "ItemOffer"
export default ItemOffer
