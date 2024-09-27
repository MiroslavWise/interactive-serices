"use client"

import { EnumSign } from "@/types/enum"
import { type TContentSignUp } from "../types/types"

import { LinksSocial } from "./LinksSocial"
import { SignUpEmail } from "./SignUpEmail"
import { SignUpPhone } from "./SignUpPhone"
import { Segments } from "@/components/common"

import { VALUES_EMAIL_PHONE } from "../constants/segments"
import { dispatchAuthModal, dispatchIModalAuthEmailOrPhone, useModalAuthEmailOrPhone } from "@/store"

import styles from "../styles/form.module.scss"

export const ContentSignUp: TContentSignUp = ({}) => {
  const typeEmailOrPhone = useModalAuthEmailOrPhone(({ typeEmailOrPhone }) => typeEmailOrPhone)

  return (
    <div className={styles.content}>
      <Segments
        type="primary"
        VALUES={VALUES_EMAIL_PHONE}
        active={VALUES_EMAIL_PHONE.find((item) => item.value === typeEmailOrPhone)!}
        setActive={(event) => {
          dispatchIModalAuthEmailOrPhone(event.value)
        }}
        isBorder
      />
      {typeEmailOrPhone === "email" ? (
        <SignUpEmail>
          <LinksSocial />
        </SignUpEmail>
      ) : typeEmailOrPhone === "phone" ? (
        <SignUpPhone>
          <LinksSocial />
        </SignUpPhone>
      ) : null}
      <article data-column>
        <p>
          Уже есть аккаунт?&nbsp;
          <a data-a-on-sign-in-type onClick={() => dispatchAuthModal({ type: EnumSign.SignIn })}>
            Войти
          </a>
        </p>
      </article>
    </div>
  )
}
