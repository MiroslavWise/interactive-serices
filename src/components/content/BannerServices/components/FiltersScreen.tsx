"use client"

import { FormFilterScreen } from "./FormFilterScreen"
import { IconXClose } from "@/components/icons/IconXClose"

import { dispatchActiveFilterScreen, useFiltersScreen } from "@/store"

import styles from "../styles/filters-screen.module.scss"

export const FiltersScreen = () => {
  const visible = useFiltersScreen(({ visible }) => visible)

  function close() {
    dispatchActiveFilterScreen(false)
  }

  return (
    <div className={styles.container} data-visible={visible}>
      <button data-close onClick={close}>
        <IconXClose />
      </button>
      <header>
        <h3>Выбрать категории услуг</h3>
      </header>
      {visible ? <FormFilterScreen /> : null}
    </div>
  )
}
