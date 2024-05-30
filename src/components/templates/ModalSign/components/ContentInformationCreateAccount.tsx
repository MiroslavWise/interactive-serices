import { Button } from "@/components/common"

import { dispatchAuthModal, useModalAuth } from "@/store"

import styles from "../styles/form.module.scss"

export const ContentInformationCreateAccount = () => {
  const email = useModalAuth(({ email }) => email)
  function handleClose() {
    dispatchAuthModal({ visible: false })
  }

  return (
    <div className={styles.content} data-test="information-create-account">
      <article data-column>
        <p>
          На почту <span>{email}</span> отправлено письмо с ссылкой для активации аккаунта.
        </p>
      </article>
      <Button
        type="button"
        typeButton="fill-primary"
        label="Хорошо"
        onClick={handleClose}
        data-test="information-create-account-button-close"
      />
    </div>
  )
}
