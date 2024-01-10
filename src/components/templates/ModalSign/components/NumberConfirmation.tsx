import { useModalAuth } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const NumberConfirmation = () => {
    const phone = useModalAuth(({ phone }) => phone)

    return (
        <div className={styles.content}>
            <article data-column>
                <p>Отправили проверочный код на номер</p>
                <b>{phone}</b>
            </article>
        </div>
    )
}
