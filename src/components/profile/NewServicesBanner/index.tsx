"use client"

import type { TNewServicesBanner } from "./types/types"

import { NewCreateBadge } from "./components/NewCreateBadge"
import { ButtonClose } from "./components/ButtonClose"
import { Glasses } from "./components/Glasses"

import { useVisibleBannerNewServices } from "@/store/hooks/useVisible"
import { cx } from "@/lib/cx"
import { NEW_CREATE_BADGES } from "./constants"

import styles from "./styles/style.module.scss"

export const NewServicesBanner: TNewServicesBanner = ({ }) => {
  const { isVisibleNewServicesBanner } = useVisibleBannerNewServices()

  return (
    <div className={cx(styles.wrapper, isVisibleNewServicesBanner && styles.active)}>
      <div className={styles.container}>
        <h3>Я хочу создать новый</h3>
        <ul>
          {
            NEW_CREATE_BADGES.map(item => (
              <NewCreateBadge
                key={`${item.value}_${item.label}`}
                {...item}
              />
            ))
          }
        </ul>
        <ButtonClose />
        <Glasses />
      </div>
    </div>
  )
}