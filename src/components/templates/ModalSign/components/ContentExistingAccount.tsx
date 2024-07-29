import { EnumSign } from "@/types/enum"

import { Button } from "@/components/common"

import { dispatchAuthModal } from "@/store"

import styles from "../styles/form.module.scss"

export const ContentExistingAccount = () => {
  return (
    <div className={styles.content}>
      <article data-column>
        <p>Аккаунт с таким номером уже существует</p>
      </article>
      <form>
        <Button
          type="button"
          typeButton="fill-primary"
          label="Войти"
          onClick={() => dispatchAuthModal({ type: EnumSign.SignIn })}
          data-test="existing-account-button-enter"
        />
        <a onClick={() => dispatchAuthModal({ type: EnumSign.SignUp })} data-test="existing-account-continue-link">
          Продолжить регистрацию
        </a>
      </form>
    </div>
  )
}
