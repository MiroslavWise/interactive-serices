"use client"

import { useEffect } from "react"

import { ButtonClose } from "@/components/common"
import CardBallon from "@/components/common/Card/CardBallon"

import { cx } from "@/lib/cx"
import { dispatchHasBalloon, useHasBalloons } from "@/store"

import styles from "./style.module.scss"

export const HasClustererBalloons = () => {
  const offers = useHasBalloons(({ offers }) => offers)
  const visibleHasBalloon = useHasBalloons(({ visibleHasBalloon }) => visibleHasBalloon)

  const close = () => dispatchHasBalloon({ visibleHasBalloon: false })

  useEffect(() => {
    if (visibleHasBalloon) {
      const keyDown = (e: KeyboardEvent) => {
        if (e.code == "Escape" || e.keyCode === 27) {
          close()
        }
      }

      document.addEventListener("keydown", keyDown, false)
      window.addEventListener("popstate", close, false)

      return () => {
        document?.removeEventListener("keydown", keyDown)
        window.removeEventListener("popstate", close)
      }
    }
  }, [visibleHasBalloon])

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visibleHasBalloon}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
        <header>
          <h3>Сервисы</h3>
        </header>
        <div data-container>
          <ul>
            {offers && offers?.length > 0 ? offers.map((item) => <CardBallon key={`::offer::general::${item.id}::`} offer={item} />) : null}
          </ul>
        </div>
      </section>
    </div>
  )
}
