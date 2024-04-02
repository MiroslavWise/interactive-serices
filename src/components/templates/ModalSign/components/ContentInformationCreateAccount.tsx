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
        <p>
          На почту <span>{email}</span> отправлено письмо с ссылкой для активации аккаунта.
        </p>
      </article>
      <Button type="button" typeButton="fill-primary" label="Хорошо" onClick={handleClose} />
    </div>
  )
}
