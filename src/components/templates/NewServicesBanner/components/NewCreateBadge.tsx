"use client"

import { EnumTypeProvider } from "@/types/enum"
import type { TNewCreateBadge } from "../types/types"

import IconAlertBalloon from "@/components/icons/IconAlertBalloon"
import IconOfferBalloon from "@/components/icons/IconOfferBalloon"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"

import { useVisibleBannerNewServices, useAddCreateModal, useOnboarding, dispatchOnboarding } from "@/store"

import styles from "./styles/styles.module.scss"

const map = new Map([
  [
    EnumTypeProvider.alert,
    <div data-alert key={`::item::key::alert::svg::`}>
      <IconAlertBalloon />
    </div>,
  ],
  [EnumTypeProvider.offer, <IconOfferBalloon key={`::item::key::offer::svg::`} />],
  [EnumTypeProvider.discussion, <IconDiscussionBalloon key={`::item::key::discussion::svg::`} />],
])

export const NewCreateBadge: TNewCreateBadge = ({ value, imageSrc, label }) => {
  const type = useOnboarding(({ type }) => type)
  const visible = useOnboarding(({ visible }) => visible)
  const dispatchVisibleTypeCreateOptionals = useAddCreateModal(
    ({ dispatchVisibleTypeCreateOptionals }) => dispatchVisibleTypeCreateOptionals,
  )
  const dispatchNewServicesBanner = useVisibleBannerNewServices(({ dispatchNewServicesBanner }) => dispatchNewServicesBanner)

  function handleType() {
    if (visible && type === value) {
      dispatchOnboarding("next")
      dispatchVisibleTypeCreateOptionals({ visible: true, type: value as EnumTypeProvider })
      dispatchNewServicesBanner(false)
    } else if (visible && type !== value) {
      return
    } else {
      dispatchVisibleTypeCreateOptionals({ visible: true, type: value as EnumTypeProvider })
      dispatchNewServicesBanner(false)
    }
  }

  return (
    <li
      className={styles.containerLiNew}
      onClick={handleType}
      data-onboarding={visible && type === value}
      id={`li-${value}-create`}
      data-not={visible && type !== value}
    >
      {map.has(value) ? map.get(value) : null}
      <p>{label}</p>
    </li>
  )
}
