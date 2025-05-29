"use client"

import IconPlus from "@/components/icons/IconPlus"

import { dispatchChangeService } from "@/store"

export function ItemCategoryAdd() {
  function handleAdd() {
    dispatchChangeService({ visible: true })
  }

  return (
    <li
      onClick={(event) => {
        event.stopPropagation()
        handleAdd()
      }}
      data-test="alias-button-modal-active-services-from"
      className="group rounded-xl border border-dashed border-grey-stroke p-3 w-full h-[7.125rem] cursor-pointer flex flex-col gap-3 justify-end items-start focus:border-text-accent hover:border-text-accent relative"
    >
      <footer className="flex flex-row items-center gap-1 [&>svg]:w-4 [&>svg]:h-4 [&>svg>path]:fill-grey-stroke group-hover:[&>svg>path]:fill-text-accent group-focus:[&>svg>path]:fill-text-accent">
        <IconPlus />
        <span className="text-grey-stroke text-sm font-medium group-hover:text-text-accent group-focus:text-text-accent">Добавить</span>
      </footer>
    </li>
  )
}
