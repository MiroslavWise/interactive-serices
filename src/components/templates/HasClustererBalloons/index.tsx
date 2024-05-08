"use client"

import { ButtonClose, ServiceLoading } from "@/components/common"
import CardBallon from "@/components/common/Card/CardBallon"

import { cx } from "@/lib/cx"
import { dispatchHasBalloon, useHasBalloons } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const HasClustererBalloons = () => {
  const offers = useHasBalloons(({ offers }) => offers)
  const visibleHasBalloon = useHasBalloons(({ visibleHasBalloon }) => visibleHasBalloon)

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visibleHasBalloon}>
      <section data-section-modal>
        <ButtonClose
          onClick={() => {
            dispatchHasBalloon({ visibleHasBalloon: false })
          }}
          position={{}}
        />
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
