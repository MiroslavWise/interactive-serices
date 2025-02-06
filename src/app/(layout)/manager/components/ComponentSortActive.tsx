"use client"

import IconSort from "@/components/icons/IconSort"
import { cx } from "@/lib/cx"
import { EOrder } from "@/services/types/general"
import { parseAsStringEnum, useQueryState } from "nuqs"

const ORDER: Record<EOrder, string> = {
  [EOrder.DESC]: "От нового к старому",
  [EOrder.ASC]: "От старого к новому",
}

function ComponentSortActive() {
  const [order, setOrder] = useQueryState("sort", parseAsStringEnum<EOrder>(Object.values(EOrder)).withDefault(EOrder.DESC))

  return (
    <div className="ml-auto flex items-center justify-start md:justify-end gap-1">
      <div className={cx("relative w-5 h-5", order === EOrder.DESC ? "*:rotate-0" : "*:rotate-180")}>
        <IconSort />
      </div>
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
