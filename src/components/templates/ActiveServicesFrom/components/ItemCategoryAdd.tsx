"use client"

import IconPlus from "@/components/icons/IconPlus"

import { dispatchChangeService } from "@/store"

import styles from "../styles/item-add.module.scss"

export function ItemCategoryAdd() {
  function handleAdd() {
    dispatchChangeService({ visible: true })
  }

  return (
    <li
      className={styles.container}
      onClick={(event) => {
        event.stopPropagation()
        handleAdd()
      }}
      data-test="alias-button-modal-active-services-from"
    >
      <footer>
        <IconPlus />
        <span>Добавить</span>
      </footer>
    </li>
  )
}
