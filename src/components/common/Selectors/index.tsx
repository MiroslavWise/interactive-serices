import type { TSelectors } from "./types"

import { useOutsideClickEvent } from "@/helpers/hooks/useOutsideClickEvent"

import styles from "./style.module.scss"

export const Selectors: TSelectors = ({
  options, label, watchField, set, param, register,
}) => {
  const [isOpen, setIsOpen, dropdownRef] = useOutsideClickEvent()
  return (
    <div
      className={styles.container}
      {...register}
      ref={dropdownRef}
    >
      <div
        className={`${styles.trigger} ${isOpen ? styles.isOpen : ""}`}
        onClick={() => {
          setIsOpen(prev => !prev)
        }}
      >
        <span className={`${isOpen ? styles.isOpen : ""} ${watchField ? styles.active : ""}`}>{watchField ? options.find(item => item.value === watchField)?.label : label}</span>
      </div>
      <ul className={isOpen ? styles.isOpen : ""}>
        {
          options.map(item => (
            <li
              key={`${item.value}_${label}`}
              onClick={() => {
                set(param, item.value)
                setIsOpen(false)
              }}
              className={watchField === item.value ? styles.active : ""}
            >
              <span>{item.label}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}