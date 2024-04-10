import { Button } from "@/components/common"

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
    </>
  )
}
