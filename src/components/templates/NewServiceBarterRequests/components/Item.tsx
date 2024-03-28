"use client"

import { EnumTypeProvider } from "@/types/enum"
import type { INewCreate, TNewCreate } from "../types/types"

import { ImageStatic } from "@/components/common/Image"

import { useResize } from "@/helpers"
import { useVisibleNewServiceBarterRequests, useAddCreateModal } from "@/store"

import styles from "./styles/style.module.scss"

export const Item: TNewCreate = (props: INewCreate) => {
  const { imageSrc, label, value } = props ?? {}
  const dispatchVisibleTypeCreateOptionals = useAddCreateModal(
    ({ dispatchVisibleTypeCreateOptionals }) => dispatchVisibleTypeCreateOptionals,
  )
  const dispatchNewServiceBarterRequests = useVisibleNewServiceBarterRequests(
    ({ dispatchNewServiceBarterRequests }) => dispatchNewServiceBarterRequests,
  )

  const { isTablet } = useResize()

  function handleType() {
    if (!value) {
      dispatchNewServiceBarterRequests(false)
    } else {
      dispatchVisibleTypeCreateOptionals({ visible: true, type: value as EnumTypeProvider })
      dispatchNewServiceBarterRequests(false)
    }
  }
  return (
    <li className={styles.containerLi} onClick={handleType} data-mobile={isTablet}>
      <ImageStatic src={imageSrc} width={36} height={36} alt={imageSrc} />
      <p>{label}</p>
    </li>
  )
}
