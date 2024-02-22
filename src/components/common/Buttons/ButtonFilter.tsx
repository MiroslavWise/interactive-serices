import type { TButtonFilter } from "./types/types"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ButtonFilter: TButtonFilter = ({ label, classNames, handleClick, disabled, active }) => {
  const click = () => {
    if (handleClick) {
      handleClick()
    }
  }

  return (
    <div className={cx(styles.buttonFillGradient, classNames)} onClick={click} data-active={active}>
      <span>{label}</span>
      <div className={styles.filterAndClose} data-active={active}>
        <img src={active ? "/svg/x-close-white.svg" : "/svg/sliders-white.svg"} alt="filter" width={24} height={24} />
      </div>
    </div>
  )
}
