import { useId } from "react"

import type { TSentenceCards } from "./types/types"

import { CardOffer } from "@/components/common/Card/Offer"
import { MotionUL } from "@/components/common/Motion"

import { HISTORY_OFFERS_MOCKS } from "@/mocks/components/profile/constants"

import styles from "./styles/style.module.scss"

export const SentenceCards: TSentenceCards = ({ value }) => {
  const id = useId()

  return (
    <MotionUL classNames={[styles.containerCards]}>
      {
        HISTORY_OFFERS_MOCKS.map((item, index) => (
          <CardOffer
            key={item.name + index + id}
            {...item}
          />
        ))
      }
    </MotionUL>
  )
}