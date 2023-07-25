"use client"

import type { TContainerOffersNow } from "./types/types"

import { CardOffer } from "@/components/common/Card/Offer"

import { HISTORY_OFFERS_MOCKS } from "@/mocks/components/profile/constants"

import styles from "./styles/style.module.scss"
import { MotionUL } from "@/components/common/Motion"

export const ContainerOffersNow: TContainerOffersNow = ({ }) => {

  return (
    <section className={styles.containerOffersNow}>
      <MotionUL>
        {
          HISTORY_OFFERS_MOCKS.map((item, index) => (
            <CardOffer
              key={item.name + index}
              {...item}
              proposals
            />
          ))
        }
      </MotionUL>
    </section>
  )
}