"use client"

import Image from "next/image"

import type { TBadgeServices } from "./types"

import { ImageStatic } from "@/components/common/Image"

import styles from "./style.module.scss"

export const BadgeServices: TBadgeServices = ({ photo, label }) => {

  return (
    <li className={styles.container}>
      <div className={styles.containerImgService}>
        <ImageStatic
          src={photo}
          alt="pl"
          width={16}
          height={16}
          classNames={[]}
        />
      </div>
      <p>{label}</p>
    </li>
  )
}