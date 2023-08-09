"use client"

import { isMobile } from "react-device-detect"

import type { TContainerOffersNow } from "./types/types"

import { CardOffer } from "@/components/common/Card/Offer"
import { MotionUL } from "@/components/common/Motion"

import { HISTORY_OFFERS_MOCKS } from "@/mocks/components/profile/constants"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ContainerOffersNow: TContainerOffersNow = ({ }) => {

  return (
    <section className={cx(styles.containerOffersNow, isMobile && styles.mobile)}>
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