import IconPlus from "@/components/icons/IconPlus"

import { useSign } from "../hooks/useSign"
import { dispatchNewServicesBanner, useAuth } from "@/store"

import styles from "../styles/link.module.scss"

export const CreateButton = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const handleAuthModal = useSign()

  return (
    <a
      className={styles.link}
      onClick={(event) => {
        event.stopPropagation()
        if (typeof isAuth !== "undefined") {
          if (isAuth) {
            dispatchNewServicesBanner()
          } else {
            event.preventDefault()
            handleAuthModal()
          }
        }
      }}
      title="Создать предложение, дискуссию или SOS-сообщение"
      aria-label="Создать предложение, дискуссию или SOS-сообщение"
      aria-labelledby="Создать предложение, дискуссию или SOS-сообщение"
      data-test="link-footer-menu-mobile-create"
    >
      <div className={styles.itemsIconLabel}>
        <div className={styles.centerPoligon} id="id-create-menu-footer">
          <IconPlus />
        </div>
        <p>Создать</p>
      </div>
    </a>
  )
}
