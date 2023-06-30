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
      <motion.main
        className={styles.header}
        initial={{ top: -100, opacity: 0, visibility: "hidden", }}
        animate={{ top: 0, opacity: 1, visibility: "visible", }}
        transition={{ duration: 0.7 }}
        exit={{ top: -100, opacity: 0, visibility: "hidden", }}
      >
        <div className={styles.container}>
          <div className={styles.logoAndNotifications}>
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
          </div>
          <div className={styles.segments}>
            <Segments
              type="primary"
              values={SERVICES}
              active={activeService}
              setActive={setActiveService}
            />
          </div>
          <div className={styles.segments}>
            <SearchElementMap />
          </div>
        </div>
      </motion.main>
    ) : (
      <motion.div
        className={styles.containerSearchTop}
        initial={{ top: -100 }}
        animate={{ top: 40 }}
        transition={{ duration: 0.5 }}
        exit={{ top: -100 }}
      >
        <SearchElementMap />
      </motion.div >
    )
  )

}