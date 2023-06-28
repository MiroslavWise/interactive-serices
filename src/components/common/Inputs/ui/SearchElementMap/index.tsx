import type { TSearchElementMap } from "./types"

import styles from "./style.module.scss"
import Image from "next/image"

export const SearchElementMap: TSearchElementMap = ({ }) => {

  return (
    <div className={styles.container} id="searchElementMap">
      <Image 
        className={styles.geoImage}
        src="/svg/geo-marker.svg"
        alt="geo"
        width={20}
        height={20}
      />
      <input
        type="text"
        placeholder="Выберите местоположение"
        className={styles.input}
      />
      <div className={styles.circleMark}>
        <Image
          src="/svg/mark.svg"
          alt="mark"
          width={20}
          height={20}
        />
      </div>
    </div>
  )
}