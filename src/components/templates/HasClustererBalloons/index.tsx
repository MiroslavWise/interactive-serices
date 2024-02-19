"use client"

import { EnumTypeProvider } from "@/types/enum"

import { ButtonClose } from "@/components/common"
import { GeneralServiceAllItem } from "@/components/common/Card"
import { GeneralAlert, GeneralOffer } from "@/components/common/Card/GeneralServiceAllItem"

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
            {offers && offers?.length > 0
              ? offers.map((item) => {
                  if (item.provider === EnumTypeProvider.offer) return <GeneralOffer key={`${item?.id}-offer-cluster`} offer={item} />
                  if (item.provider === EnumTypeProvider.alert) return <GeneralAlert key={`${item?.id}-offer-cluster`} offer={item} />
                  return <GeneralServiceAllItem key={`${item?.id}-offer-cluster`} {...item!} />
                })
              : null}
          </ul>
        </div>
      </section>
    </div>
  )
}
