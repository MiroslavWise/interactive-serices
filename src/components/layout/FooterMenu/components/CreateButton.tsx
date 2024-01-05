import { memo } from "react"

import { useSign } from "../hooks/useSign"
import { dispatchNewServicesBanner, useAuth } from "@/store/hooks"

import styles from "../styles/link.module.scss"

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
                        dispatchNewServicesBanner(true)
                    } else {
                        handleAuthModal()
                    }
                }
            }}
        >
            <div className={styles.itemsIconLabel}>
                <div className={styles.centerPoligon} id="id-create-menu-footer">
                    <img src="/svg/plus.svg" alt="plus" width={20} height={20} />
                </div>
                <p>Создать</p>
            </div>
        </a>
    )
})
