"use client"

import { Button, ButtonClose } from "@/components/common"

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
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
        <article>
          <div data-img>
            <img src="/svg/check-email-large.svg" alt="check" width={44} height={42.95} />
          </div>
          <div data-titles>
            <h3>Проверьте почту</h3>
            <p>
              На почту <span>{email}</span> отправлено письмо с ссылкой для активации аккаунта.
            </p>
          </div>
          <Button type="button" typeButton="fill-primary" label="Хорошо" onClick={close} />
        </article>
      </section>
    </div>
  )
}
