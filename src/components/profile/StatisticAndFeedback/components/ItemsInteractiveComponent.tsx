"use client"

import { useEffect, useRef, useState } from "react"

import type { TItemsInteractiveComponent } from "./types/types"

import { CardReview } from "@/components/common/CardReview"

import { MOCKS_REVIEW_VALUES } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"
import { ICardReview } from "@/components/common/CardReview/types"

interface Column {
  items: ICardReview[];
}

export const ItemsInteractiveComponent: TItemsInteractiveComponent = ({ }) => {
  const column1Ref = useRef<HTMLDivElement>(null)
  const column2Ref = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState<Column[]>([])

  useEffect(() => {
    const distributeItems = () => {
      const middleIndex = Math.ceil(MOCKS_REVIEW_VALUES.length / 2)
      const column1Items = MOCKS_REVIEW_VALUES.slice(0, middleIndex)
      const column2Items = MOCKS_REVIEW_VALUES.slice(middleIndex)
      setColumns([{ items: column1Items }, { items: column2Items }])
    }

    distributeItems()
  }, [])

  return (
    <div className={styles.containerItemsInteractive}>
      <ul className={styles.ul}>
        <div className={styles.column} ref={column1Ref}>
          {columns[0]?.items.map((item, index) => (
            <CardReview
              key={item.date + index + "columns1"}
              {...item}
              classNames={[styles.card]}
            />
          ))}
        </div>
        <div className={styles.column} ref={column2Ref}>
          {columns[1]?.items.map((item, index) => (
            <CardReview
              key={item.date + index + "columns2"}
              {...item}
              classNames={[styles.card]}
            />
          ))}
        </div>
      </ul>
    </div>
  )
}