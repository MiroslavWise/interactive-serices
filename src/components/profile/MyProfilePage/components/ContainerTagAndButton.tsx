"use client"

import { parseAsStringEnum, useQueryState } from "nuqs"

import { EnumTypeProvider } from "@/types/enum"
import { type ISegmentValues } from "@/components/common/Segments/types"

import { Segments } from "@/components/common/Segments"

const TABS: ISegmentValues<EnumTypeProvider>[] = [
  {
    label: "Умения и услуги",
    value: EnumTypeProvider.offer,
  },
  {
    label: "События",
    value: EnumTypeProvider.POST,
  },
  {
    label: "SOS",
    value: EnumTypeProvider.alert,
  },
]

export const ContainerTagAndButton = () => {
  const [state, setState] = useQueryState(
    "type",
    parseAsStringEnum<EnumTypeProvider>(Object.values(EnumTypeProvider)).withDefault(EnumTypeProvider.offer),
  )

  return (
    <div className="w-full h-11 max-md:[&>article>li]:px-2.5">
      <Segments
        type="primary"
        VALUES={TABS}
        active={TABS.find((_) => _.value === (state || EnumTypeProvider.offer))!}
        setActive={({ value }) => {
          setState(value)
        }}
      />
    </div>
  )
}
