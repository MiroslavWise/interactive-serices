import { EnumSign } from "@/types/enum"

import { LinksSocial } from "./LinksSocial"
import { SignInEmail } from "./SignInEmail"
import { SignInPhone } from "./SignInPhone"
import { Segments } from "@/components/common"

import { VALUES_EMAIL_PHONE } from "../constants/segments"
import { dispatchAuthModal, dispatchIModalAuthEmailOrPhone, useModalAuthEmailOrPhone } from "@/store"

import styles from "../styles/form.module.scss"

function ContentSignIn() {
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
        <SignInEmail
          itemForgot={
            <div className="flex flex-col items-start justify-start w-full z-[3]">
              <a
                className="text-text-accent text-center text-sm font-medium cursor-pointer"
                onClick={() => dispatchAuthModal({ type: EnumSign.ForgotPassword })}
              >
                Забыли пароль?
              </a>
            </div>
          }
        >
          <LinksSocial />
        </SignInEmail>
      ) : typeEmailOrPhone === "phone" ? (
        <SignInPhone itemForgot={null}>
          <LinksSocial />
        </SignInPhone>
      ) : null}
      <article data-column>
        <p>
          Нет аккаунта?&nbsp;
          <a data-a-on-register-type onClick={() => dispatchAuthModal({ type: EnumSign.SignUp })}>
            Зарегистрироваться
          </a>
        </p>
      </article>
    </div>
  )
}

ContentSignIn.displayName = "ContentSignIn"
export default ContentSignIn
