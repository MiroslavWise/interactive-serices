import Button from "@/components/common/Button"

import { dispatchCloseModalAuth, useModalAuth } from "@/store"

import styles from "../styles/form.module.scss"

export const ContentInformationCreateAccount = () => {
  const email = useModalAuth(({ email }) => email)

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
        onClick={dispatchCloseModalAuth}
        data-test="information-create-account-button-close"
      />
    </div>
  )
}
