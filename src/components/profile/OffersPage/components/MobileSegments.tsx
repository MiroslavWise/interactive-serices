import type { TMobileSegments } from "./types/types"

import { MobileOfferSegment } from "@/components/common/Card/MobileOfferSegment"

import { OFFERS_CARD } from "./constants"
import { useVisibleExchanges } from "@/store"

export const MobileSegments: TMobileSegments = () => {
  const dispatchExchanges = useVisibleExchanges(({ dispatchExchanges }) => dispatchExchanges)

  return (
    <ul className="w-full inline-flex gap-4 !z-[3]">
      {OFFERS_CARD.map((item) => (
        <MobileOfferSegment
          key={`${item.value}_card_offer`}
          src={item.src}
          label={item.label}
          handleClick={() => {
            dispatchExchanges({ visible: true, type: item.value })
          }}
        />
      ))}
    </ul>
  )
}
