import Image from "next/image"

import type { TBlockTitle } from "./types/types"

import { BlockCoin } from "./BlockCoin"

import styles from "./styles/style.module.scss"

export const BlockTitle: TBlockTitle = ({ name, photo, geo, price, rating }) => {

  return (
    <div className={styles.title}>
      <div className={styles.avatar}>
        <Image
          src={photo}
          alt="photo"
          width={44}
          height={44}
        />
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
        <div className={styles.geo}>
          <Image
            src="/svg/geo-marker.svg"
            alt="geo"
            width={14}
            height={14}
          />
          <p>{geo}</p>
        </div>
        <BlockCoin coin={price} />
      </div>
    </div>
  )
}