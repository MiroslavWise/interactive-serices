import type { TMobileSegments } from "./types/types"

import { MobileOfferSegment } from "@/components/common/Card/MobileOfferSegment"

import { OFFERS_CARD } from "./constants"

import styles from "./styles/style.module.scss"

export const  MobileSegments: TMobileSegments = ({value, setValue}) => {

  console.log("value: ", value)

  return (
    <ul className={styles.containerOffersCardMobile}>
      {
        OFFERS_CARD.map((item) => (
          <MobileOfferSegment
            key={`${item.value}_card_offer`}
            src={item.src}
            label={item.label}
            handleClick={() => {
              setValue(item.value)
            }}
          />
        ))
      }
    </ul>
  )
}