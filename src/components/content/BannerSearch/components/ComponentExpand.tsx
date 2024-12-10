import { type Dispatch, type SetStateAction } from "react"

import ButtonExpand from "./ButtonExpand"

import { cx } from "@/lib/cx"

interface IProps {
  on: Dispatch<SetStateAction<boolean>>
  is: boolean
  length: number
  title: string
}

function ComponentExpand({ is, on, length, title }: IProps) {
  return (
    <a className={cx(length > 0 ? "flex flex-row" : "hidden", "w-full items-center justify-between")}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-text-primary">{title}</span>
        <div className="relative flex items-center justify-center h-[1.1875rem] min-w-[1.1875rem] w-fit rounded-[0.59375rem] bg-element-accent-1">
          <span className="text-[0.625rem] text-center text-text-button font-semibold">{length}</span>
        </div>
      </div>
      <ButtonExpand on={on} is={is} />
    </a>
  )
}

ComponentExpand.displayName = "ComponentExpand"
export default ComponentExpand
