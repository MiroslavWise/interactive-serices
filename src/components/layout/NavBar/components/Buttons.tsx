"use client"

import { usePathname } from "next/navigation"

import { EnumSign } from "@/types/enum"

import { Button } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchAuthModal, dispatchNewServicesBanner, useAuth } from "@/store/hooks"

import styles from "../styles/components.module.scss"

export const Buttons = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const pathname = usePathname()

  if (pathname.includes("/legal/")) return null

  return typeof isAuth === "undefined" ? (
    <div className={cx("loading-screen relative flex flex-row", styles.buttons)}>
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
          onClick={dispatchNewServicesBanner}
          data-test="nav-bar-button-create"
          id="nav-bar-button-create"
        />
      ) : (
        <>
          <Button
            type="button"
            label="Зарегистрироваться"
            typeButton="regular-primary"
            className={styles.widthButton}
            onClick={() => dispatchAuthModal({ visible: true, type: EnumSign.SignUp })}
          />
          <Button
            type="button"
            label="Войти"
            typeButton="fill-primary"
            className={styles.widthButton}
            onClick={() => dispatchAuthModal({ visible: true, type: EnumSign.SignIn })}
          />
        </>
      )}
    </div>
  )
}
