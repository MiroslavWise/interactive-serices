"use client"

import { usePathname } from "next/navigation"

import { EnumSign } from "@/types/enum"

import { Button } from "@/components/common"

import { dispatchAuthModal, dispatchDownloadApplication, dispatchNewServicesBanner, useAuth } from "@/store"

export const Buttons = () => {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const pathname = usePathname()

  if (pathname.includes("/legal/")) return null

  return typeof isAuth === "undefined" ? (
    <div className="loading-screen relative flex flex-row gap-3">
      <span />
      <span />
    </div>
  ) : (
    <div className="relative flex flex-row gap-3">
      {isAuth ? (
        <>
          <Button
            type="button"
            label="Скачать приложение"
            typeButton="regular-primary"
            className="px-4 w-min"
            onClick={() => dispatchDownloadApplication(true)}
          />
          <Button
            label="Создать"
            typeButton="fill-primary"
            className="min-w-[8.875rem]"
            suffixIcon={<img src="/svg/plus.svg" alt="plus" width={24} height={24} />}
            style={{ width: "100%" }}
            onClick={dispatchNewServicesBanner}
            data-test="nav-bar-button-create"
            id="nav-bar-button-create"
          />
        </>
      ) : (
        <>
          <Button
            type="button"
            label="Скачать приложение"
            typeButton="regular-primary"
            className="px-4 w-min"
            onClick={() => dispatchDownloadApplication(true)}
          />
          <Button
            type="button"
            label="Зарегистрироваться"
            typeButton="regular-primary"
            className="min-w-[8.875rem]"
            onClick={() => dispatchAuthModal({ visible: true, type: EnumSign.SignUp })}
          />
          <Button
            type="button"
            label="Войти"
            typeButton="fill-primary"
            className="min-w-[8.875rem]"
            onClick={() => dispatchAuthModal({ visible: true, type: EnumSign.SignIn })}
          />
        </>
      )}
    </div>
  )
}
