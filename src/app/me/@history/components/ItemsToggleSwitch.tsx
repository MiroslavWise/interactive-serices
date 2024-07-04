"use client"

import { EnumStatusBarter } from "@/types/enum"

import { cx } from "@/lib/cx"
import { useCurrentAndCompleted } from "./WrapperCurrentAndCompleted"

interface IItem {
  label: string
  value: EnumStatusBarter
}

const ITEMS: IItem[] = [
  {
    label: "Текущие",
    value: EnumStatusBarter.EXECUTED,
  },
  {
    label: "Завершённые",
    value: EnumStatusBarter.COMPLETED,
  },
]

function ItemsToggleSwitch() {
  const { state, dispatch } = useCurrentAndCompleted()

  return (
    <ul className="w-full p-1 h-11 rounded-[1.375rem] border border-solid border-grey-stroke flex flex-row items-center">
      {ITEMS.map((item) => (
        <button
          key={`::key::toggle::switch::${item.value}::`}
          type="button"
          className={cx(
            "w-full h-9 rounded-[1.125rem] border-none outline-none hover:bg-grey-field flex items-center justify-center",
            item.value === state && "!bg-element-accent-2",
          )}
          onClick={() => dispatch(item.value)}
        >
          <span className={cx("text-text-secondary text-sm text-center font-medium", item.value === state && "!text-text-tab")}>
            {item.label}
          </span>
        </button>
      ))}
    </ul>
  )
}

ItemsToggleSwitch.displayName = "ItemsToggleSwitch"
export default ItemsToggleSwitch
