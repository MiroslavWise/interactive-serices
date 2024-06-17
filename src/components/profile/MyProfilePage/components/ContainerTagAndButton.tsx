"use client"

import { EnumTypeProvider } from "@/types/enum"
import type { TContainerTagAndButton } from "./types/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Segments } from "@/components/common/Segments"

import { useProviderProfileOffer, dispatchProvider } from "@/store"

import styles from "./styles/style.module.scss"
import { useResize } from "@/helpers"

const TABS = (isMobile: boolean): ISegmentValues<EnumTypeProvider>[] => [
  {
    label: isMobile ? "Предложения" : "Мои предложения",
    value: EnumTypeProvider.offer,
  },
  {
    label: "Дискуссии",
    value: EnumTypeProvider.discussion,
  },
  {
    label: "SOS",
    value: EnumTypeProvider.alert,
  },
]

export const ContainerTagAndButton: TContainerTagAndButton = ({}) => {
  const stateProvider = useProviderProfileOffer(({ stateProvider }) => stateProvider)
  const { isMobile } = useResize()
  return (
    <div className={styles.containerTagAndButton}>
      <Segments
        type="primary"
        VALUES={TABS(isMobile)}
        active={TABS(isMobile).find((_) => _.value === stateProvider)!}
        setActive={({ value }) => {
          dispatchProvider(value)
        }}
      />
    </div>
  )
}
