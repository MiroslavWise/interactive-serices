"use client"

import { ButtonClose } from "@/components/common/Buttons"
import { Content } from "./components/Content"
import { Header } from "./components/Header"
import { Glasses } from "./components/Glasses"

import { useVisibleModalBarter } from "@/store/hooks"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export function Barter() {
  const { isVisible, setIsVisibleBarter } = useVisibleModalBarter()

  return (
    <div className={cx(styles.wrapperContainer, isVisible && styles.visible)}>
      <div className={styles.contentModal}>
        <ButtonClose
          onClick={() => setIsVisibleBarter({ isVisible: false })}
          position={{ top: 12, right: 12, }}
        />
        <Header />
        <Content />
        <Glasses />
      </div>
    </div>
  )
}