"use client"

import { useState } from "react"
import { isMobile } from "react-device-detect"

import type { TExchanges } from "./components/types/types"

import { ContainerHeader } from "./components/ContainerHeader"
import { ContainerOffersNow } from "./components/ContainerOffersNow"
import { MobileSegments } from "./components/MobileSegments"

import styles from "./styles/style.module.scss"

export const OffersPage = () => {
  const [valueExchanges, setValueExchanges] = useState<TExchanges>("current")

  return (
    isMobile ? (
      <section className="p-top-5 w-100 h-100">
        <MobileSegments value={valueExchanges} setValue={setValueExchanges} />
        <ContainerHeader total={6} />
        <ContainerOffersNow />
      </section>
    ) : (
      <section className={styles.containerOffersPage}>
        <ContainerHeader total={6} />
        <ContainerOffersNow />
      </section>
    )
  )
}