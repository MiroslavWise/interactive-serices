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
          "[&>svg]:absolute [&>avg]:transition-transform [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4 [&>svg]:h-4",
          open && "[&>svg]:rotate-180",
        )}
      >
        <IconChevronDown />
      </button>
      <section
        className={cx(
          "absolute min-w-[17.5rem] max-w-[17.5rem] top-[calc(100%_+_0.5rem)] -right-2 p-3 rounded-xl shadow-menu-absolute invisible opacity-0 -z-10 flex flex-col gap-0.125 bg-BG-second",
          open && "!visible !opacity-100 !z-50",
        )}
      >
        {MENU_ARRAY.map((_) => (
          <a
            key={`::key::sort::feedback::${_.value}::`}
            className="w-full py-2 px-0.375 grid grid-cols-[minmax(0,1fr)_1rem] gap-0.625 items-center rounded-md bg-BG-second hover:bg-grey-field cursor-pointer "
            onClick={(event) => {
              event.stopPropagation()
              dispatchFilterSortFeedbackCustomer(_.value)
              setOpen(false)
            }}
          >
            <p className="text-text-primary text-base text-left font-normal">{_.label}</p>
            <div
              className={cx(
                "w-4 h-4 p-2 relative hidden",
                "[&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4 [&>svg]:h4",
                sort === _.value && "!flex",
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
