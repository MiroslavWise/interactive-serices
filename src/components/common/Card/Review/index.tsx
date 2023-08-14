"use client"

import { useId } from "react"
import Image from "next/image"
import { isMobile } from "react-device-detect"

import type { TCardReview } from "./types"

import { Rate } from "@/components/common/Rate"
import { MotionLI } from "@/components/common/Motion"
import { ImageStatic } from "@/components/common/ImageStatic"

import styles from "./style.module.scss"

export const CardReview: TCardReview = ({ user, date, rate, description, images, classNames }) => {
  const id = useId()

  return (
    <MotionLI classNames={[styles.container, classNames?.join(" "), isMobile && styles.mobile]}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.userDate}>
            <a>{user}</a>
            <p>{date}</p>
          </div>
          <Rate rate={rate} />
        </header>
        <p className={styles.description}>{description}</p>
        <footer className={styles.images}>
          {
            Array.isArray(images)
              ? images?.map((item, index) => (
                <ImageStatic
                  key={`${index}_${id}`}
                  src={item}
                  alt={item}
                  width={100}
                  height={72}
                  classNames={[]}
                />
              )) : null
          }
        </footer>
      </div>
    </MotionLI>
  )
}