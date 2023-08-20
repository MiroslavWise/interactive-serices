
import type { TCustomInputText } from "./types"

import styles from "./style.module.scss"

export const CustomInputText: TCustomInputText = ({placeholder}) => {

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
      />
    </div>
  )
}