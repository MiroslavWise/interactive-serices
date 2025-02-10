"use client"

import { useEffect, useState } from "react"
import { parseAsStringEnum, useQueryState } from "nuqs"

import { EOrder } from "@/services/types/general"

import IconSort from "@/components/icons/IconSort"

import { cx } from "@/lib/cx"
import { nameTitle } from "@/lib/names"

const ORDER: Record<EOrder, string> = {
  [EOrder.DESC]: "От нового к старому",
  [EOrder.ASC]: "От старого к новому",
}

function ComponentSortActive({ total }: { total?: number }) {
  const [t, setT] = useState(total)

  useEffect(() => {
    if (typeof total === "number") {
      setT(total)
    }
  }, [total])

  const [order, setOrder] = useQueryState("sort", parseAsStringEnum<EOrder>(Object.values(EOrder)).withDefault(EOrder.DESC))

  return (
    <div className="flex flex-row items-center justify-end gap-2">
      <span className="text-text-secondary text-[0.8125rem] leading-[1.125rem] font-normal">
        {t} {nameTitle(t ?? 0, "users")}
      </span>
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
    </div>
  )
}

ComponentSortActive.displayName = "ComponentSortActive"
export default ComponentSortActive
