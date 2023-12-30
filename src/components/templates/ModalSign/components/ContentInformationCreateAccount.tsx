import { Button } from "@/components/common"

import { dispatchAuthModal, useModalAuth } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const ContentInformationCreateAccount = () => {
    const email = useModalAuth(({ email }) => email)
    function handleClose() {
        dispatchAuthModal({ visible: false })
    }

    return (
        <div className={styles.content}>
            <article data-column>
                <p>Мы выслали ссылку для потверждения аккаунта. Проверьте почту</p>
                <b>{email}</b>
            </article>
            <Button type="button" typeButton="regular-primary" label="Закрыть" onClick={handleClose} />
        </div>
    )
}
