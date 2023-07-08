

import type { TPopupFilter } from "./types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const PopupFilter: TPopupFilter = ({ visible }) => {
  

  return (
    <div className={cx(styles.popupFilter, visible && styles.visible)}>
      <div className={cx(styles.content, "scrollHidden")}>

      </div>
    </div>
  )
}