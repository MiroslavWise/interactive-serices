import { Dispatch, SetStateAction } from "react"

import IconChevron from "@/components/icons/IconChevron"

import { cx } from "@/lib/cx"

interface IProps {
  is: boolean
}

function ButtonExpand({ is }: IProps) {
  return (
    <button
      type="button"
      className={cx(
        "relative w-5 h-5 *:w-5 *:h-5 *:transition-transform [&>svg>path]:fill-text-primary",
        is ? "*:-rotate-90" : "*:rotate-90",
      )}
    >
      <IconChevron />
    </button>
  )
}

ButtonExpand.displayName = "ButtonExpand"
export default ButtonExpand
