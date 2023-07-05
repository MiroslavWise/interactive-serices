"use client"

import { useState, useEffect, useRef } from "react"
import { isMobile } from "react-device-detect"
import { motion } from "framer-motion"
import Image from "next/image"

import type { THeaderMobile } from "./types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { SearchElementMap } from "@/components/common/Inputs"
import { Segments } from "@/components/common/Segments"

import { SERVICES } from "./constants"

import styles from "./styles/style.module.scss"

export const Header: THeaderMobile = ({ setVisibleNotification }) => {
  const [activeService, setActiveService] = useState<ISegmentValues>(SERVICES[0])
  useEffect(() => {
    function alignMiddleElement() {
      setTimeout(() => {
        const leftBanner = document.getElementById("SignBanner")
        const rightBanner = document.getElementById("ServiceBanner")
        const rightProfilePublic = document.getElementById("ProfilePublic")
        const headerRef = document.getElementById("headerRef")
        const container = window.innerWidth

        const leftBannerWidth = (leftBanner?.offsetWidth || 0) + 24
        const rightBannerWidth = (rightBanner?.offsetWidth || 0) + 25
        const rightServiceBannerWidth = rightProfilePublic?.getBoundingClientRect()
        const headerRefWidth = headerRef?.offsetWidth || 0
        const rightWidth = rightServiceBannerWidth?.right === container ? rightServiceBannerWidth?.width : rightBannerWidth
        const marginLeft = (container - leftBannerWidth - rightWidth - headerRefWidth) / 2
        if (headerRef) {
          headerRef.style.left = `${leftBannerWidth + marginLeft}px`
        }
        if (container - (leftBannerWidth + rightWidth + 40) < headerRefWidth) {
          if (headerRef) {
            // headerRef.style.width = `clamp(150px, ${container - (leftBannerWidth + rightWidth + 40)}px, 346px)`
          }
        }
      }, 10)
    }

    if (!isMobile) {
      alignMiddleElement()
      window.addEventListener("resize", alignMiddleElement)
    }

    return () => {
      window.removeEventListener("resize", alignMiddleElement)
    }
  }, [])

  return (
    isMobile ? (
      <motion.div
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
            <div
              className={styles.containerNotification}
              onClick={() => setVisibleNotification(true)}
            >
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
      </motion.div >
    ) : (
      <motion.div
        id="headerRef"
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