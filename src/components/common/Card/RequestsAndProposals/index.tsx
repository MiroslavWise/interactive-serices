"use client"

import Image from "next/image"
import { useId, useState, useEffect, useCallback, useMemo } from "react"
import { useSwipeable } from "react-swipeable"
import { isMobile } from "react-device-detect"

import type { TRequestsAndProposals } from "./types"

import { BadgeServices } from "@/components/common/Badge"
import { MotionLI } from "@/components/common/Motion"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"
import { ButtonDefault } from "../../Buttons"
import { ImageStatic } from "../../ImageStatic"

export const CardRequestsAndProposals: TRequestsAndProposals = ({ photos, title, services, type }) => {
  const [active, setActive] = useState(0)
  const id = useId()



  const handlers = useSwipeable({
    onSwipedLeft(event) { slideImage("toLeft") },
    onSwipedRight(event) { slideImage("toRight") }
  })

  const slideImage = useCallback((direction: "toLeft" | "toRight") => {
    if (direction === "toLeft") {
      active >= photos.length - 1 ? setActive(0) : setActive(prev => prev + 1)
    }
    if (direction === "toRight") {
      if (active <= 0) {
        setActive(photos.length - 1)
      } else {
        setActive(prev => prev - 1)
      }
    }
  }, [active, photos.length])

  //todo
  const shuffleArray = useCallback(() => {
    const newArray = [...photos]
    newArray.sort(() => Math.random() - 0.5)
    return newArray
  }, [photos])

  useEffect(() => {
    const interval = setInterval(() => {
      slideImage("toLeft")
    }, 3333)

    return () => clearInterval(interval)
  }, [slideImage])

  //todo
  const photosRandom: string[] = useMemo(() => {
    return shuffleArray()
  }, [shuffleArray])

  return (
    <MotionLI classNames={[styles.container, styles[type!], isMobile && styles.mobile]}>
      <div className={styles.header}>
        <h4>{title}</h4>
        <ul>
          {
            services.map((item, index) => (
              <BadgeServices
                key={id + item.label + index}
                label={item.label}
                photo={item.photo}
              />
            ))
          }
        </ul>
      </div>
      <div className={styles.carouselPhotos} {...handlers}>
        {
          photosRandom.map((item, index) => (
            <ImageStatic
              key={item + index + id + "image"}
              classNames={[index === active && styles.active]}
              alt="image"
              src={item}
              width={239}
              height={220}
            />
          ))
        }
        <div className={styles.containerDots}>
          {
            photosRandom.map((item, index) => (
              <span
                key={index + id + "dots"}
                className={cx(active === index && styles.active)}
                onClick={() => setActive(index)}
              />))
          }
        </div>
        <div className={styles.button}>
          <ButtonDefault
            type="primary"
            label="Откликнутся"
          />
        </div>
      </div>
    </MotionLI>
  )
}