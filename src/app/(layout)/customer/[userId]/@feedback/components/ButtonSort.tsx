"use client"

import IconChevronDown from "@/components/icons/IconChevronDown"
import IconCheckAccent from "@/components/icons/IconCheckAccent"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { dispatchFilterSortFeedbackCustomer, type TFilterSort, useFilterSortFeedbackCustomer } from "@/store"
import { memo } from "react"

interface IMenu {
  value: TFilterSort
  label: string
}

const MENU: Record<TFilterSort, IMenu> = {
  default: {
    label: "По умолчанию",
    value: "default",
  },
  "first-positive": {
    label: "Сначала позитивные",
    value: "first-positive",
  },
  "first-negative": {
    label: "Сначала негативные",
    value: "first-negative",
  },
}

const MENU_ARRAY = Object.values(MENU)

function ButtonSort() {
  const [open, setOpen, ref] = useOutsideClickEvent()
  const sort = useFilterSortFeedbackCustomer(({ sort }) => sort)

  return (
    <article className="relative z-50 h-5 grid grid-cols-[minmax(0,1fr)_1.25rem] items-center gap-2" ref={ref}>
      <p className="text-text-primary text-sm font-normal">{MENU[sort].label}</p>
      <button
        onClick={(event) => {
          event.stopPropagation()
          setOpen((_) => !_)
        }}
        type="button"
        className={cx(
          "w-4 h-4 relative p-2",
          "*:absolute *:transition-transform *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4",
          open ? "*:rotate-180" : "rotate-0",
        )}
      >
        <IconChevronDown />
      </button>
      <section
        className={cx(
          "absolute min-w-[17.5rem] max-w-[17.5rem] top-[calc(100%_+_0.5rem)] -right-2 p-3 rounded-xl shadow-menu-absolute flex flex-col gap-0.5 bg-BG-second",
          open ? "visible opacity-100 z-50" : "invisible opacity-0 -z-10",
        )}
      >
        {MENU_ARRAY.map((_) => (
          <a
            key={`::key::sort::feedback::${_.value}::`}
            className="w-full py-2 px-1.5 grid grid-cols-[minmax(0,1fr)_1rem] gap-2.5 items-center rounded-md bg-BG-second hover:bg-grey-field cursor-pointer "
            onClick={(event) => {
              event.stopPropagation()
              dispatchFilterSortFeedbackCustomer(_.value)
              setOpen(false)
            }}
          >
            <p className="text-text-primary text-base text-left font-normal">{_.label}</p>
            <div
              className={cx(
                "w-4 h-4 p-2 relative",
                "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h4",
                sort === _.value ? "*:flex" : "*:hidden",
              )}
            >
              <IconCheckAccent />
            </div>
          </a>
        ))}
      </section>
    </article>
  )
}

ButtonSort.displayName = "ButtonSort"
export default memo(ButtonSort)
