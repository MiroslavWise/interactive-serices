"use client"

import { useMemo } from "react"

import { type TContainerHeader } from "./types/types"

export const ContainerHeader: TContainerHeader = ({ total }) => {
  const stringTotal: string | number = useMemo(() => {
    if (total <= 9 && total >= -9) {
      return `0${total}`
    }
    return total
  }, [total])

  return (
    <div className="w-full flex items-center gap-3">
      <div className="flex flex-row justify-center items-center py-1 px-2 rounded-2xl bg-element-accent-1 md:bg-BG-second z-10">
        <h4 className="text-text-button md:text-text-accent text-xl font-semibold z-10">{stringTotal}</h4>
      </div>
      <h4 className="text-text-primary text-base md:text-xl font-medium md:font-semibold z-10">Предложения обменов, пришедшие к Вам</h4>
    </div>
  )
}
