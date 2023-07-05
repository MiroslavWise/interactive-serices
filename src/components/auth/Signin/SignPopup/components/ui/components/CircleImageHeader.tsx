import Image from "next/image"
import { TCircleImageHeader } from "../../../types"


import styles from "./style.module.scss"

export const CircleImageHeader: TCircleImageHeader = ({ src }) => {
  
  return (
    <div className={styles.bigCircle}>
      <div className={styles.middleCircle}>
        <Image
          src={src}
          alt={src}
          width={35}
          height={35}
        />
      </div>
    </div>
  )
}