import { cache } from "react"

import AOffer from "./AOffer"
import IconReAccent from "@/components/icons/IconReAccent"

import { getIdOffer } from "@/services"

const getCacheOfferId = cache(getIdOffer)

interface IProps {
  idOffer: string | number
}

async function ItemOffer({ idOffer }: IProps) {
  const { res: offer } = await getCacheOfferId(idOffer)

  return (
    <div className="w-full grid items-center grid-cols-[1rem_minmax(0,1fr)] gap-0.625">
      <div className="w-4 h-4 relative p-2 flex items-center justify-center [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4 [&>svg]:h-4">
        <IconReAccent />
      </div>
      <AOffer offer={offer!} />
    </div>
  )
}

ItemOffer.displayName = "ItemOffer"
export default ItemOffer
