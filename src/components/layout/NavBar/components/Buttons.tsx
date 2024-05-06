"use client"

import { Button } from "@/components/common"
import { useAuth, dispatchAuthModal, dispatchModal, EModalData } from "@/store/hooks"

import styles from "../styles/components.module.scss"

export const Buttons = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)

  return typeof isAuth === "undefined" ? (
    <div className={styles.buttons} data-loading>
      <span />
      <span />
    </div>
  ) : (
    <div className={styles.buttons}>
      {isAuth ? (
        <Button
          label="Создать"
          typeButton="fill-primary"
          className={styles.widthButton}
          suffixIcon={<img src="/svg/plus.svg" alt="plus" width={24} height={24} />}
          style={{ width: "100%" }}
          onClick={() => dispatchModal(EModalData.NewServicesBanner)}
          data-test="nav-bar-button-create"
          id="nav-bar-button-create"
        />
      ) : (
        <>
          <Button
            label="Войти"
            typeButton="fill-primary"
            className={styles.widthButton}
            onClick={() => dispatchAuthModal({ visible: true, type: "SignIn" })}
          />
          <Button
            label="Зарегистрироваться"
            typeButton="regular-primary"
            className={styles.widthButton}
            onClick={() => dispatchAuthModal({ visible: true, type: "SignUp" })}
          />
        </>
      )}
    </div>
  )
}
