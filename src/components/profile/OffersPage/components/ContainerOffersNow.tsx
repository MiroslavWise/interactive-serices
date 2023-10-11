"use client"

import { isMobile } from "react-device-detect"

import type { TContainerOffersNow } from "./types/types"

import { MotionUL } from "@/components/common/Motion"
import { CardOffer } from "@/components/common/Card/Offer"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ContainerOffersNow: TContainerOffersNow = ({ data }) => {
    return (
        <section
            className={cx(styles.containerOffersNow, isMobile && styles.mobile)}
        >
            <MotionUL>
                {Array.isArray(data)
                    ? data.map((item) => (
                          <CardOffer
                              key={`${item.id}-offer-page-${item.provider}`}
                              {...item}
                          />
                      ))
                    : null}
            </MotionUL>
        </section>
    )
}
