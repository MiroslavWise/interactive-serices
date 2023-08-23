"use client"

import { isMobile } from "react-device-detect"

import { ContainerHeader } from "./components/ContainerHeader"
import { ContainerOffersNow } from "./components/ContainerOffersNow"
import { MobileSegments } from "./components/MobileSegments"

import styles from "./styles/style.module.scss"

export const OffersPage = () => {

  return (
    isMobile ? (
      <ul className="p-top-5 p-left-5 p-right-5 p-bottom-14 w-100 h-100">
        <MobileSegments />
        <ContainerHeader total={6} />
        <ContainerOffersNow />
      </ul>
    ) : (
      <section className={styles.containerOffersPage}>
        <ContainerHeader total={6} />
        <ContainerOffersNow />
      </section>
    )
  )
}