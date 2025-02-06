"use client"

import { EOrder } from "@/services/types/general"
import { parseAsStringEnum, useQueryState } from "nuqs"

const ORDER: Record<EOrder, string> = {
  [EOrder.DESC]: "От нового к старому",
  [EOrder.ASC]: "От старого к новому",
}

function ComponentSortActive() {
  const [order, setOrder] = useQueryState("sort", parseAsStringEnum<EOrder>(Object.values(EOrder)).withDefault(EOrder.DESC))

  return (
    <div className="ml-auto flex items-center">
      <button
        type="button"
        className="text-sm font-medium text-text-primary"
        onClick={() => setOrder(order === EOrder.DESC ? EOrder.ASC : EOrder.DESC)}
      >
        {ORDER.hasOwnProperty(order) ? ORDER[order] : null}
      </button>
    </div>
  )
}

ComponentSortActive.displayName = "ComponentSortActive"
export default ComponentSortActive
