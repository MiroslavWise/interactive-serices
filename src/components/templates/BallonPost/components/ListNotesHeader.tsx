import { type Dispatch, type SetStateAction } from "react"

import IconNote from "@/components/icons/IconNote"

import { useOutsideClickEvent } from "@/helpers"
import IconChevronDown from "@/components/icons/IconChevronDown"
import { cx } from "@/lib/cx"
import IconCheck from "@/components/icons/IconCheck"

const TIME_SORT: {
  label: string
  value: boolean
}[] = [
  {
    label: "Сначала новые",
    value: true,
  },
  {
    label: "Сначала старые",
    value: false,
  },
]

function ListNotesHeader({
  length,
  newState,
  setNewState,
}: {
  length: number
  newState: boolean
  setNewState: Dispatch<SetStateAction<boolean>>
}) {
  const [open, setOpen, ref] = useOutsideClickEvent()

  const current = TIME_SORT.find((item) => item.value === newState)!

  return (
    <div className="w-full flex flex-row items-center gap-4 justify-between">
      <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-1.5">
        <div className="relative w-5 h-5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 [&>svg>path]:fill-text-secondary">
          <IconNote />
        </div>
        <span className="text-text-primary text-sm font-medium">{length} записи</span>
      </div>
      <div className="relative" ref={ref}>
        <button
          type="button"
          className="grid gap-2 grid-cols-[minmax(0,1fr)_1rem] items-center relative"
          onClick={(event) => {
            event.stopPropagation()
            setOpen((_) => !_)
          }}
        >
          <span className="text-text-primary text-sm font-normal">{current.label}</span>
          <div
            className={cx(
              "relative w-4 h-4 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4 *:transition-all",
              open ? "*:rotate-0" : "*:rotate-180",
            )}
          >
            <IconChevronDown />
          </div>
        </button>
        <article
          className={cx(
            "absolute top-[calc(100%_+_0.25rem)] right-0 bg-BG-second shadow-box-down p-3 rounded-xl flex flex-col gap-0.5 w-60",
            open ? "opacity-100 z-50 visible" : "opacity-0 invisible -z-10",
          )}
        >
          {TIME_SORT.map((item) => (
            <a
              key={`:key:sort:time:${item.value}:`}
              className="w-full py-2 px-1.5 grid grid-cols-[minmax(0,1fr)_1rem] gap-2.5 items-center rounded-md hover:bg-grey-field cursor-pointer"
              onClick={(event) => {
                event.stopPropagation()
                setOpen(false)
                setNewState(item.value)
              }}
            >
              <span className="text-text-primary text-base font-normal">{item.label}</span>
              <div
                className={cx(
                  "h-6 w-4 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4",
                  "[&>svg>path]:fill-element-accent-1",
                  item.value === newState ? "*:flex" : "*:hidden",
                )}
              >
                <IconCheck />
              </div>
            </a>
          ))}
        </article>
      </div>
    </div>
  )
}

ListNotesHeader.displayName = "ListNotesHeader"
export default ListNotesHeader
