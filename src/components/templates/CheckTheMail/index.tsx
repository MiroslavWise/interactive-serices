"use client"

import Button from "@/components/common/Button"
import { ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchCheckTheMail, useCheckTheMail } from "@/store"

import styles from "./style.module.scss"

export const CheckTheMail = () => {
  const visible = useCheckTheMail(({ visible }) => visible)
  const email = useCheckTheMail(({ email }) => email)

  function close() {
    dispatchCheckTheMail(false, undefined)
  }

  return (
    <div
      className={cx("wrapper-fixed", styles.wrapper, "flex flex-col justify-end md:justify-center items-center md:p-5")}
      data-visible={visible}
    >
      <section data-section-modal className="relative w-full rounded-t-3xl md:rounded-2 p-5 md:p-10 pt-9 md:pt-5 bg-BG-second">
        <ButtonClose onClick={close} />
        <article className="w-full flex flex-col items-center gap-[1.875rem]">
          <div data-img className="rounded-full flex items-center justify-center">
            <img src="/svg/check-email-large.svg" alt="check" width={44} height={42.95} className="w-11 h-11" />
          </div>
          <div data-titles className="w-full flex flex-col items-center gap-4">
            <h3 className="text-text-primary text-center text-2xl font-semibold">Проверьте почту</h3>
            <p className="text-text-primary text-center text-sm font-normal">
              На почту <span className="font-semibold">{email}</span> отправлено письмо с ссылкой для активации аккаунта.
            </p>
          </div>
          <Button type="button" typeButton="fill-primary" label="Хорошо" onClick={close} />
        </article>
      </section>
    </div>
  )
}
