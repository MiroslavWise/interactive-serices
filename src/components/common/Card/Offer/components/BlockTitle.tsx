import Image from "next/image"

import type { TBlockTitle } from "./types/types"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"
import { BlockCoin } from "./BlockCoin"

import styles from "./styles/style.module.scss"

export const BlockTitle: TBlockTitle = ({ name, photo, geo, price, rating }) => {

  return (
    <div className={styles.title}>
      <div className={styles.avatar}>
        {
          photo?.includes("http")
            ? (
              <NextImageMotion
                src={photo}
                alt="avatar"
                width={400}
                height={400}
                className={styles.photo}
              />
            ): (
                <ImageStatic 
                  src="/png/default_avatar.png"
                  alt="avatar"
                  width={44}
                  height={44}
                  classNames={[styles.photo]}
              />
          )
        }
        <div className={styles.rating}>
          <Image
            src="/svg/star.svg"
            alt="stars"
            width={9.8}
            height={9.8}
          />
          <p>{rating}</p>
        </div>
      </div>
      <div className={styles.nameGeo}>
        <h4>{name}</h4>
        <GeoTagging size={14} fontSize={12} location={geo} />
        <BlockCoin coin={price} />
      </div>
    </div>
  )
}