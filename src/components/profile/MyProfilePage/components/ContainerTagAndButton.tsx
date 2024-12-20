"use client"

import { parseAsStringEnum, useQueryState } from "nuqs"
import { EnumTypeProvider } from "@/types/enum"
import { type ISegmentValues } from "@/components/common/Segments/types"

import { Segments } from "@/components/common/Segments"

import { useResize } from "@/helpers"

const TABS = (isMobile: boolean): ISegmentValues<EnumTypeProvider>[] => [
  {
    label: isMobile ? "Предложения" : "Мои предложения",
    value: EnumTypeProvider.offer,
  },
  {
    label: "Обсуждения",
    value: EnumTypeProvider.discussion,
  },
  {
    label: "Посты",
    value: EnumTypeProvider.POST,
  },
  {
    label: "SOS",
    value: EnumTypeProvider.alert,
  },
]

export const ContainerTagAndButton = () => {
  const { isMobile } = useResize()

  const [state, setState] = useQueryState(
    "type",
    parseAsStringEnum<EnumTypeProvider>(Object.values(EnumTypeProvider)).withDefault(EnumTypeProvider.offer),
  )

  return (
    <div className="w-full h-11 max-md:[&>article>li]:px-2.5">
      <Segments
        type="primary"
        VALUES={TABS(isMobile)}
        active={TABS(isMobile).find((_) => _.value === (state || EnumTypeProvider.offer))!}
        setActive={({ value }) => {
          setState(value)
        }}
      />
    </div>
  )
}
