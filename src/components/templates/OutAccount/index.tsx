import Button from "@/components/common/Button"

import { useOut } from "@/helpers"
import { dispatchModalClose } from "@/store"

export default function OutAccount() {
  const { out } = useOut()

  function outAccount() {
    dispatchModalClose()
    out()
  }

  function close() {
    dispatchModalClose()
  }

  return (
    <>
      <article data-test="article-out-account">
        <div data-img>
          <img src="/svg/log-out.svg" alt="out" width={20} height={20} />
        </div>
        <h2>Вы уверены, что хотите выйти из аккаунта?</h2>
      </article>
      <footer data-test="footer-out-account">
        <Button type="button" typeButton="fill-primary" label="Да, выйти" onClick={outAccount} data-test="button-out-account-on-out" />
        <Button type="button" typeButton="regular-primary" label="Нет, остаться" onClick={close} data-test="button-out-account-close" />
      </footer>
    </>
  )
}
