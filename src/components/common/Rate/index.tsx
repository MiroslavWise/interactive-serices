import { useId } from "react"
import Image from "next/image"

import type { TRate } from "./types"

import styles from "./rate.module.scss"

function createArray(length: number, count: number): boolean[] {
  const fill = [];
  for (let i = 0; i < count; i++) {
    fill.push(i <= length - 1);
  }
  return fill;
}

export const Rate: TRate = ({ rate }) => {
  const id = useId();
  return (
    <ul className={styles.container}>
      {
        createArray(Number(rate), 5).map((bool, index) => (
          <li key={`${index}_rate_${id}`}>
            <Image
              src={bool ? "/svg/stars/star-fill.svg" : "/svg/stars/star-outline.svg"}
              alt="stars"
              width={20}
              height={20}
            />
          </li>
        ))
      }
    </ul>
  )
}