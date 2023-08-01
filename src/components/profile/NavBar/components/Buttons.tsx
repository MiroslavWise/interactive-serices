"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { useAuth, useVisibleBannerNewServices, useVisibleAndTypeAuthModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const Buttons = () => {
  const { setIsVisibleNewServicesBanner } = useVisibleBannerNewServices()
  const { setVisibleAndType } = useVisibleAndTypeAuthModal()
  const { isAuth } = useAuth()
  const { push } = useRouter()

  return (
    isAuth ? (
      <>
        <div className={styles.buttons}>
          <ButtonDefault
            label="Просмотр карты"
            handleClick={() => push(`/`)}
          />
          <ButtonFill
            type="primary"
            label="Создать новую"
            classNames={styles.widthButton}
            suffix={<Image src="/svg/plus.svg" alt="plus" width={24} height={24} />}
            handleClick={() => setIsVisibleNewServicesBanner(true)}
          />
        </div>
      </>
    ) : (
      <div className={styles.buttons}>
        <ButtonFill
          type="primary"
          label="Войти"
          classNames={styles.widthButton}
          handleClick={() => setVisibleAndType({ visible: true, type: "SignIn" })}
        />
        <ButtonDefault
          label="Зарегистрироваться"
          handleClick={() => setVisibleAndType({ visible: true, type: "SignIn" })}
        />
      </div>
    )
  )
}