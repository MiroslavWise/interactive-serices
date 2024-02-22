"use client"

import { EnumTypeProvider } from "@/types/enum"
import type { TNewServicesBanner } from "./types/types"

import { ButtonClose } from "@/components/common"
import { NewCreateBadge } from "./components/NewCreateBadge"

import { cx } from "@/lib/cx"
import { NEW_CREATE_BADGES } from "./constants"
import { useOnboarding, useVisibleBannerNewServices } from "@/store"

import { ArticleOnboarding } from "@/components/templates"

import styles from "./styles/style.module.scss"

export const NewServicesBanner: TNewServicesBanner = ({}) => {
  const step = useOnboarding(({ step }) => step)
  const type = useOnboarding(({ type }) => type)
  const visible = useOnboarding(({ visible }) => visible)
  const isVisibleNewServicesBanner = useVisibleBannerNewServices(({ isVisibleNewServicesBanner }) => isVisibleNewServicesBanner)
  const dispatchNewServicesBanner = useVisibleBannerNewServices(({ dispatchNewServicesBanner }) => dispatchNewServicesBanner)

  function close() {
    if (!visible) {
      dispatchNewServicesBanner(false)
    }
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={isVisibleNewServicesBanner}>
      <section id="container-services-banner">
        <ButtonClose
          onClick={close}
          position={{
            right: 12,
            top: 12,
          }}
        />
        <h3>Я хочу создать</h3>
        <ul>
          <NewCreateBadge {...NEW_CREATE_BADGES[0]} />
          {visible && step === 1 && type === EnumTypeProvider.offer && <ArticleOnboarding />}
          <NewCreateBadge {...NEW_CREATE_BADGES[1]} />
          {visible && step === 1 && type === EnumTypeProvider.alert && <ArticleOnboarding />}
          <NewCreateBadge {...NEW_CREATE_BADGES[2]} />
          {visible && step === 1 && type === EnumTypeProvider.discussion && <ArticleOnboarding />}
        </ul>
      </section>
    </div>
  )
}
