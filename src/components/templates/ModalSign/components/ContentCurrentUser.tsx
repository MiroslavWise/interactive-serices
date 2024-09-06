import Link from "next/link"

import { EnumSign } from "@/types/enum"

import Avatar from "@avatar"
import { Button } from "@/components/common"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { dispatchAuthModal, useModalAuth } from "@/store"

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
        <div className="w-full p-3 grid grid-cols-[2.75rem_minmax(0,1fr)] gap-2 items-center rounded-2xl border border-solid border-grey-stroke-light">
          <Avatar
            className={cx("w-11 h-11  p-[1.375rem]", user?.profile?.image ? "rounded-xl" : "rounded-lg")}
            image={user?.profile?.image}
          />
          <section className="w-full flex flex-col items-start">
            <div className="flex flex-row items-center w-full gap-1">
              <Link className="text-text-primary text-base font-medium" href={{ pathname: `/customer/${user?.id}` }} target="_blank">
                {user?.profile?.firstName || "Имя"} {user?.profile?.lastName || "Фамилия"}
              </Link>
              <div className="relative w-6 h-6 p-3 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
                <IconVerifiedTick />
              </div>
            </div>
            <span className="text-text-secondary text-sm text-ellipsis line-clamp-1 max-w-full font-normal">
              {user?.profile?.username || "user"}
            </span>
          </section>
        </div>
      ) : null}
      <Button
        type="button"
        typeButton="fill-primary"
        label="Войти"
        onClick={() => dispatchAuthModal({ type: EnumSign.SignIn, visible: true })}
      />
      <article data-column style={{ marginTop: "-1.25rem" }}>
        <p>
          Не помните пароль?&nbsp;
          <a
            onClick={() => {
              dispatchAuthModal({ type: EnumSign.ForgotPassword, email: user?.email!, visible: true })
            }}
            data-test="current-user-restore-link"
          >
            Восстановить
          </a>
        </p>
      </article>
    </div>
  )
}
