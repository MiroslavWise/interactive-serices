import { EnumSign } from "@/types/enum"

import { Button } from "@/components/common"

import { useModalAuth, dispatchAuthModal } from "@/store"

import styles from "../styles/form.module.scss"

export const ContentInformationEmailReset = () => {
  const email = useModalAuth(({ email }) => email)

  function handleClose() {
    dispatchAuthModal({ visible: false })
  }

  return (
    <div className={styles.content}>
      <article data-column>
        <p>Мы выслали ссылку для восстановления пароля. Проверьте почту</p>
        <b>{email}</b>
      </article>
      <Button type="button" typeButton="regular-primary" label="Закрыть" onClick={handleClose} />
      <article data-column style={{ marginTop: "-1.25rem" }}>
        <p>
          Вспомнили?&nbsp;
          <a
            onClick={() => {
              dispatchAuthModal({ type: EnumSign.SignIn })
            }}
          >
            Войти
          </a>
        </p>
      </article>
    </div>
  )
}
