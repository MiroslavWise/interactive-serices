"use client"

import type { TNewCreateBadge } from "../types/types"

import { ImageStatic } from "@/components/common"

import { useVisibleBannerNewServices, useAddCreateModal, useOnboarding, dispatchOnboarding } from "@/store"

import styles from "./styles/styles.module.scss"

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
      dispatchVisibleTypeCreateOptionals({ visible: true, type: value })
      dispatchNewServicesBanner(false)
    } else if (visible && type !== value) {
      return
    } else {
      dispatchVisibleTypeCreateOptionals({ visible: true, type: value })
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
      <ImageStatic src={imageSrc} alt={imageSrc} width={36} height={36} />
      <p>{label}</p>
    </li>
  )
}
