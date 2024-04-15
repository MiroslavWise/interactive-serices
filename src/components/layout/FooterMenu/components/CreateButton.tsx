import { memo } from "react"

import { useSign } from "../hooks/useSign"
import { dispatchModal, EModalData, useAuth } from "@/store"

import styles from "../styles/link.module.scss"
import { IconPlus } from "@/components/icons/IconPlus"

export const CreateButton = memo(function CreateButton() {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const handleAuthModal = useSign()

  return (
    <a
      className={styles.link}
      onClick={(event) => {
        event.stopPropagation()
        if (typeof isAuth !== "undefined") {
          if (isAuth) {
            dispatchModal(EModalData.NewServicesBanner)
          } else {
            handleAuthModal()
          }
        }
      }}
    >
      <div className={styles.itemsIconLabel}>
        <div className={styles.centerPoligon} id="id-create-menu-footer">
          <IconPlus />
        </div>
        <p>Создать</p>
      </div>
    </a>
  )
})
