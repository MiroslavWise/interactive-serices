import type { TContentSignIn } from "../types/types"

import { LinksSocial } from "./LinksSocial"
import { SignInEmail } from "./SignInEmail"
import { SignInPhone } from "./SignInPhone"
import { Segments } from "@/components/common"
import { VALUES_EMAIL_PHONE } from "../constants/segments"
import { dispatchAuthModal, dispatchIModalAuthEmailOrPhone, useModalAuthEmailOrPhone } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const ContentSignIn: TContentSignIn = ({ setValueSecret }) => {
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
                        <div className={styles.RememberChange}>
                            <a onClick={() => dispatchAuthModal({ type: "ForgotPassword" })}>Забыли пароль?</a>
                        </div>
                    }
                    setValueSecret={setValueSecret}
                >
                    <LinksSocial />
                </SignInEmail>
            ) : typeEmailOrPhone === "phone" ? (
                <SignInPhone
                    itemForgot={
                        <div className={styles.RememberChange}>
                            <a onClick={() => dispatchAuthModal({ type: "ForgotPassword" })}>Забыли пароль?</a>
                        </div>
                    }
                >
                    <LinksSocial />
                </SignInPhone>
            ) : null}
            <article data-column>
                <p>
                    Нет аккаунта? <a onClick={() => dispatchAuthModal({ type: "SignUp" })}>Зарегистрироваться</a>
                </p>
            </article>
        </div>
    )
}
