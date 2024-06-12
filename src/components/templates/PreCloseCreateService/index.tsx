"use client"

import { EnumTypeProvider } from "@/types/enum"

import { Button } from "@/components/common"
import IconMark from "@/components/icons/IconMark"

import { cx } from "@/lib/cx"
import { closeCreateOffers, dispatchClosePreCloseCreateService, dispatchModalClose, usePreCloseCreateService } from "@/store"

import styles from "./style.module.scss"

const H: Map<EnumTypeProvider, string> = new Map([
  [EnumTypeProvider.offer, "Предложения"],
  [EnumTypeProvider.alert, "SOS-сообщения"],
  [EnumTypeProvider.discussion, "Дискусии"],
])

const ICON: Map<EnumTypeProvider, string> = new Map([
  [EnumTypeProvider.offer, "/svg/category/default.svg"],
  [EnumTypeProvider.alert, "/svg/category/SOS-default.svg"],
  [EnumTypeProvider.discussion, "/svg/category/discussion-default.svg"],
])

function PreCloseCreateService() {
  const type = usePreCloseCreateService(({ type }) => type)
  const visible = usePreCloseCreateService(({ visible }) => visible)

  function close() {
    dispatchModalClose()
    closeCreateOffers()
    dispatchClosePreCloseCreateService()
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section>
        <article>
          <div data-icon>
            <div data-img>{ICON.has(type!) ? <img src={ICON.get(type!)!} alt={type! || ""} /> : null}</div>
            <div data-mark>
              <IconMark />
            </div>
          </div>
          <h3>Вы уверены, что хотите закрыть создание {H.has(type!) ? H.get(type!) : null}?</h3>
          <p>Заполненные поля не сохранятся</p>
        </article>
        <footer>
          <Button type="button" typeButton="regular-primary" label="Нет, остаться" onClick={dispatchClosePreCloseCreateService} />
          <Button type="button" typeButton="fill-primary" label="Да, закрыть" onClick={close} />
        </footer>
      </section>
    </div>
  )
}

PreCloseCreateService.displayName = "PreCloseCreateService"
export default PreCloseCreateService
