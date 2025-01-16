"use client"

import { type IResponseOffers } from "@/services/offers/types"

import { ImageCategory } from "@/components/common"

import { dispatchBallonOffer } from "@/store"

function AOffer({ offer }: { offer: IResponseOffers }) {
  const { category, title = "" } = offer ?? {}
  const { id, slug, provider } = category ?? {}

  function handle() {
    if (!!offer) {
      dispatchBallonOffer({ offer: offer })
    }
  }

  return (
    <a className="w-full grid gap-1.5 grid-cols-[1rem_minmax(0,1fr)] items-center cursor-pointer" onClick={handle}>
      <div className="w-4 h-4 relative p-2 flex items-center justify-center *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
        <ImageCategory id={id!} slug={slug} provider={provider} />
      </div>
      <p title={title || ""} aria-labelledby={title} className="line-clamp-1 text-ellipsis text-text-primary text-sm font-normal">
        {title || ""}
      </p>
    </a>
  )
}

AOffer.displayName = "AOffer"
export default AOffer
