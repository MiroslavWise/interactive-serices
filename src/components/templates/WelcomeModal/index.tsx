"use client"

import { isMobile } from "react-device-detect"

import { Content } from "./components/Content"
import { ButtonClose } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { useWelcomeModal } from "@/store"

import styles from "./styles/style.module.scss"

export function WelcomeModal() {
  const isVisible = useWelcomeModal(({ isVisible }) => isVisible)
  const setVisible = useWelcomeModal(({ setVisible }) => setVisible)

  function close() {
    setVisible(false)
  }

  return isVisible ? (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={isVisible}>
      {isMobile ? (
        <>
          <Content />
          <ButtonClose
            position={{
              right: 12,
              top: 12,
            }}
            onClick={close}
          />
        </>
      ) : (
        <div data-container>
          <Content />
          <ButtonClose
            position={{
              right: 12,
              top: 12,
            }}
            onClick={close}
          />
        </div>
      )}
    </div>
  ) : null
}
