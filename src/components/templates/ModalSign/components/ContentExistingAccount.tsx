import { Button } from "@/components/common"

import { dispatchAuthModal } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const ContentExistingAccount = () => {
  return (
    <div className={styles.content}>
      <article data-column>
        <p>Аккаунт с таким номером уже существует</p>
      </article>
      <form>
        <Button type="button" typeButton="fill-primary" label="Войти" onClick={() => dispatchAuthModal({ type: "SignIn" })} />
        <a onClick={() => dispatchAuthModal({ type: "SignUp" })}>Продолжить регистрацию</a>
      </form>
    </div>
  )
}
