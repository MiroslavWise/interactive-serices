import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { useOut } from "@/helpers"
import { dispatchOutAccount, useOutAccount } from "@/store"

import styles from "./style.module.scss"

export const OutAccount = () => {
  const visible = useOutAccount(({ visible }) => visible)
  const { out } = useOut()

  function outAccount() {
    dispatchOutAccount(false)
    out()
  }

  function close() {
    dispatchOutAccount(false)
  }

  return (
    <div className={cx(styles.wrapper, "wrapper-fixed")} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
        <article>
          <div data-img>
            <img src="/svg/log-out.svg" alt="out" width={20} height={20} />
          </div>
          <h2>Вы уверены, что хотите выйти из аккаунта?</h2>
        </article>
        <footer>
          <Button type="button" typeButton="fill-primary" label="Да, выйти" onClick={outAccount} />
          <Button type="button" typeButton="regular-primary" label="Нет, остаться" onClick={close} />
        </footer>
      </section>
    </div>
  )
}
