"use client"

import { useState } from "react"
import { isMobile } from "react-device-detect"
import { motion } from "framer-motion"
import Image from "next/image"

import type { THeaderMobile } from "./types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { SearchElementMap } from "@/components/common/Inputs"
import { Segments } from "@/components/common/Segments"

import { SERVICES } from "./constants"

import styles from "./styles/style.module.scss"

export const Header: THeaderMobile = ({ }) => {
  const [activeService, setActiveService] = useState<ISegmentValues>(SERVICES[0])
  return (
    isMobile ? (
      <motion.header
        className={styles.header}
        initial={{ top: "-100%" }}
        animate={{ top: 0 }}
        transition={{ duration: 0.7 }}
        exit={{ top: "-100%" }}
      >
        <div className={styles.container}>
          <section className={styles.logoAndNotifications}>
            <Image
              src="/logo/wordmark.svg"
              alt="logo"
              width={107}
              height={28.3}
            />
            <div className={styles.containerNotification}>
              <Image
                src="/svg/bell.svg"
                alt="bell"
                width={22}
                height={22}
              />
              <div className={styles.badge}>
                <span>2</span>
              </div>
            </div>
          </section>
          <section className={styles.segments}>
            <Segments
              type="primary"
              values={SERVICES}
              active={activeService}
              setActive={setActiveService}
            />
          </section>
          <section className={styles.segments}>
            <SearchElementMap />
          </section>
        </div>
      </motion.header>
    ) : (
      <section className={styles.containerSearchTop}>
        <SearchElementMap />
      </section >
    )
  )

}