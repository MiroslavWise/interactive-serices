"use client"

import Button from "@/components/common/Button"
import IconPost from "@/components/icons/IconPost"
import IconCheck from "@/components/icons/IconCheck"
import IconOffer3d from "@/components/icons/IconOffer3d"
import IconAlertCirlceRed from "@/components/icons/IconAlertCirlceRed"

import { cx } from "@/lib/cx"
import { dispatchModalClose, EModalData, useModal } from "@/store"

// const title: Map<EModalData, string> = new Map([
//   [EModalData.SUCCESS_UPDATE_ALERT, "Обновление завершено!"],
//   [EModalData.SUCCESS_UPDATE_OFFER, "Обновление завершено!"],
//   [EModalData.SUCCESS_UPDATE_POSTS, "Обновление завершено!"],
// ])

const description: Map<EModalData, string> = new Map([
  [
    EModalData.SUCCESS_UPDATE_ALERT,
    "Изменения сохранены, и ваше SOS-сообщение будут обновлены на карте. Для того, чтобы увидеть обновления прямо сейчас, перезагрузите страниц",
    // "Ваше SOS-сообщение сейчас отправлено на модерацию, после проверки оно обновится на карте. Это займёт некоторое малое время",
  ],
  [
    EModalData.SUCCESS_UPDATE_OFFER,
    "Изменения сохранены, и ваша умение или услуга будут обновлены на карте. Для того, чтобы увидеть обновления прямо сейчас, перезагрузите страницу",
  ],
  [
    EModalData.SUCCESS_UPDATE_POSTS,
    "Изменения сохранены, и ваше событие будут обновлены на карте. Для того, чтобы увидеть обновления прямо сейчас, перезагрузите страницу",
    // "Ваше событие отправлено на модерацию, после проверки оно обновится на карте. Это займёт некоторое малое время",
  ],
])

function UpdateSuccess() {
  const type = useModal(({ data }) => data)

  return (
    <>
      <article className="md:px-5 w-full flex flex-col items-center gap-5">
        <div
          className={`w-[4.375rem] h-[4.375rem] rounded-[2.1875rem] aspect-square mb-[calc(2.5rem_-_1.125rem)] relative z-10 flex items-center justify-center bg-grey-field`}
        >
          <div className={cx("w-8 h-8 *:w-8 *:h-8")}>
            {type === EModalData.SUCCESS_UPDATE_ALERT ? (
              <IconAlertCirlceRed />
            ) : type === EModalData.SUCCESS_UPDATE_OFFER ? (
              <IconOffer3d />
            ) : type === EModalData.SUCCESS_UPDATE_POSTS ? (
              <IconPost />
            ) : null}
          </div>
          <div
            className={cx(
              "absolute left-1/2 -translate-x-1/2 rounded-xl top-[calc(100%_-_0.875rem)] w-6 h-6 flex items-center justify-center p-1 bg-more-field z-[5]",
              "*:w-4 *:h-4",
              "before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-more-field",
              "after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-more-field",
              "before:w-8 before:h-8 before:rounded-2xl before:opacity-30 before:-z-[2]",
              "after:w-10 after:h-10 after:rounded-[1.25rem] after:opacity-15 after:-z-[1]",
            )}
          >
            <IconCheck />
          </div>
        </div>
        <h2 className="text-text-primary text-center text-2xl font-semibold">
          Обновление завершено!
          {/* {type && title.has(type) ? title.get(type) : null} */}
        </h2>
        <p className="text-text-primary text-center text-sm font-normal">{type && description.has(type) ? description.get(type) : null}</p>
      </article>
      <Button
        type="button"
        className="max-w-56"
        typeButton="fill-primary"
        label="Понятно"
        onClick={(event) => {
          event.stopPropagation()
          dispatchModalClose()
        }}
      />
    </>
  )
}

UpdateSuccess.displayName = "UpdateSuccess"
export default UpdateSuccess
