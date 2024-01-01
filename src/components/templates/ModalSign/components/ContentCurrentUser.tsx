import { Button, GeoTagging, NextImageMotion } from "@/components/common"

import { dispatchAuthModal, useModalAuth } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const ContentCurrentUser = () => {
    const user = useModalAuth(({ user }) => user)

    const geo = user?.addresses?.find((item) => item?.addressType === "main")

    return (
        <div className={styles.content}>
            <article data-column>
                <p>Аккаунт с такой почтой уже существует</p>
            </article>
            {user ? (
                <div data-card-account>
                    <div data-avatar>
                        <NextImageMotion src={user?.profile?.image?.attributes?.url!} alt="avatar" height={44} width={44} />
                    </div>
                    <section>
                        <div data-title>
                            <h4>
                                {user?.profile?.firstName} {user?.profile?.lastName}
                            </h4>
                            {user?.verified ? <img src="/svg/verified-tick.svg" alt="verified" width={16} height={16} /> : null}
                        </div>
                        {geo ? <GeoTagging size={14} fontSize={12} location={geo?.additional} /> : null}
                    </section>
                </div>
            ) : null}
            <Button type="button" typeButton="fill-primary" label="Войти" onClick={() => dispatchAuthModal({ type: "SignIn" })} />
            <article data-column style={{ marginTop: "-1.25rem" }}>
                <p>
                    Не помните пароль?{" "}
                    <a
                        onClick={() => {
                            dispatchAuthModal({ type: "ForgotPassword", email: user?.email! })
                        }}
                    >
                        Восстановить
                    </a>
                </p>
            </article>
        </div>
    )
}
