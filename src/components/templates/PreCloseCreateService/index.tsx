"use client"

import { EnumTypeProvider } from "@/types/enum"

import Button from "@/components/common/Button"
import IconMark from "@/components/icons/IconMark"
import IconPost from "@/components/icons/IconPost"
import IconAlertCirlceRed from "@/components/icons/IconAlertCirlceRed"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"

import { cx } from "@/lib/cx"
import { closeCreateOffers, dispatchClosePreCloseCreateService, dispatchModalClose, usePreCloseCreateService } from "@/store"
import { IconSpriteCategoryId } from "@/components/icons/icon-sprite-category"

const H: Map<EnumTypeProvider, string> = new Map([
  [EnumTypeProvider.offer, "Умения и услуги"],
  [EnumTypeProvider.alert, "SOS-сообщения"],
  [EnumTypeProvider.discussion, "Обсуждения"],
  [EnumTypeProvider.POST, "Событие"],
  [EnumTypeProvider.NOTE, "Запись"],
])

const ICON = new Map([
  [EnumTypeProvider.offer, <IconSpriteCategoryId id={`category-default`} key={`EnumTypeProvider.offer`} />],
  [EnumTypeProvider.alert, <IconAlertCirlceRed key={`EnumTypeProvider.alert`} />],
  [EnumTypeProvider.discussion, <IconDiscussionBalloon key={`EnumTypeProvider.discussion`} />],
  [EnumTypeProvider.POST, <IconPost key={`EnumTypeProvider.POST`} />],
  [EnumTypeProvider.NOTE, <IconPost key={`EnumTypeProvider.NOTE`} />],
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
    <div
      className={cx(
        "bg-translucent fixed inset-0 w-full h-full -z-10 opacity-0 invisible flex flex-col items-center p-0 md:pt-[9.375rem] md:pb-4 md:px-5 max-md:justify-end",
        visible && "!z-[1003] !opacity-100 !visible",
      )}
    >
      <section className="relative flex w-full md:max-w-[33.75rem] pt-9 pb-5 px-5 md:pt-5 md:px-10 md:pb-10 flex-col justify-center items-center gap-[1.875rem] rounded-t-3xl rounded-b-none md:rounded-2 bg-BG-second">
        <article className="w-full flex flex-col items-center gap-5">
          <div className="relative pb-4 flex flex-col w-[4.375rem]">
            <div
              className={cx(
                "relative w-[4.375rem] h-[4.375rem] rounded-[2.1875rem] bg-grey-field flex items-center justify-center p-[1.1875rem] *:w-8 *:h-8",
                type === EnumTypeProvider.alert && "[&>svg>g>path]:!fill-text-error",
              )}
            >
              {ICON.has(type!) ? ICON.get(type!) : null}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#fea032] rounded-2xl p-[0.45rem] flex items-center justify-center *:w-[1.1rem] *:h-[1.1rem]">
              <IconMark />
            </div>
          </div>
          <h3 className="text-text-primary text-center font-semibold text-2xl">
            Вы уверены, что хотите закрыть создание {H.has(type!) ? H.get(type!) : null}?
          </h3>
          <p className="text-text-primary text-center font-normal text-sm">Заполненные поля не сохранятся</p>
        </article>
        <footer className="w-full flex flex-col-reverse md:flex-row gap-3">
          <Button type="button" typeButton="regular-primary" label="Нет, остаться" onClick={dispatchClosePreCloseCreateService} />
          <Button type="button" typeButton="fill-primary" label="Да, закрыть" onClick={close} />
        </footer>
      </section>
    </div>
  )
}

PreCloseCreateService.displayName = "PreCloseCreateService"
export default PreCloseCreateService
