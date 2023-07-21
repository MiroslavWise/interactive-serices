"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

import type { TItemsReviews } from "./types/types"
import type { ICardReview } from "@/components/common/Card/Review/types"

import { CardReview } from "@/components/common/Card/Review"

import { MOCKS_REVIEW_VALUES } from "@/mocks/components/auth/constants"
import { motionOpacityY } from "@/lib/motion"

import styles from "./styles/style.module.scss"

interface Column {
  items: ICardReview[];
}

export const ItemsReviews: TItemsReviews = ({ }) => {
  const column1Ref = useRef<HTMLDivElement>(null)
  const column2Ref = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState<Column[] | Column>([])

  useEffect(() => {
    const distributeItems = () => {
      const widthWindow = window.innerWidth
      if (widthWindow > 1258) {
        const middleIndex = Math.ceil(MOCKS_REVIEW_VALUES.length / 2)
        const column1Items = MOCKS_REVIEW_VALUES.slice(0, middleIndex)
        const column2Items = MOCKS_REVIEW_VALUES.slice(middleIndex)
        setColumns([{ items: column1Items }, { items: column2Items }])
      } else {
        setColumns({ items: MOCKS_REVIEW_VALUES })
      }
    }
    distributeItems()
  }, [])

  return (
    <div className={styles.containerItemsInteractive}>
      <ul
        className={styles.ul}
      >
        {
          Array.isArray(columns)
            ? (
              <>
                <motion.div
                  className={styles.column} ref={column1Ref}
                  variants={motionOpacityY}
                  initial="hidden"
                  animate="visible"
                >
                  {columns[0]?.items.map((item, index) => (
                    <CardReview
                      key={item.date + index + "columns1"}
                      {...item}
                      classNames={[styles.card]}
                    />
                  ))}
                </motion.div>
                <motion.div
                  className={styles.column} ref={column2Ref}
                  variants={motionOpacityY}
                  initial="hidden"
                  animate="visible"
                >
                  {columns[1]?.items.map((item, index) => (
                    <CardReview
                      key={item.date + index + "columns2"}
                      {...item}
                      classNames={[styles.card]}
                    />
                  ))}
                </motion.div>
              </>
            ) : (
              <motion.div
                className={styles.column}
                variants={motionOpacityY}
                initial="hidden"
                animate="visible"
              >
                {
                  columns.items.map((item, index) => (
                    <CardReview
                      key={item.date + index + "columns1"}
                      {...item}
                      classNames={[styles.card]}
                    />
                  ))
                }
              </motion.div>
            )
        }
      </ul>
    </div>
  )
}