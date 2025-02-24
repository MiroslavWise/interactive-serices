"use client"

import { EnumTypeProvider } from "@/types/enum"

import Button from "@/components/common/Button"
import IconCheck from "@/components/icons/IconCheck"
import IconOffer3d from "@/components/icons/IconOffer3d"
import IconAlertCirlceRed from "@/components/icons/IconAlertCirlceRed"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"

import { cx } from "@/lib/cx"
import { dispatchModalClose, useAddCreateModal } from "@/store"

// const title: Map<EnumTypeProvider, string> = new Map([
//   [EnumTypeProvider.alert, "Готово!"],
//   // [EnumTypeProvider.discussion, "Мы скоро разместим Обсуждение на карте"],
//   [EnumTypeProvider.offer, "Готово!"],
// ])

const description: Map<EnumTypeProvider, string> = new Map([
  [EnumTypeProvider.alert, "Ваше SOS-сообщение успешно создана! Для того, чтобы увидеть ее, перезагрузите страницу"],
  // [
  //   EnumTypeProvider.discussion,
  //   "Ваше обсуждение сейчас отправлена на модерацию, после проверки вы получите уведомление об этом в личном кабинете",
  // ],
  [EnumTypeProvider.offer, "Ваше умение или услуга успешно создана! Для того, чтобы увидеть ее, перезагрузите страницу"],
])

function SuccessNewOptional() {
  const typeAdd = useAddCreateModal(({ typeAdd }) => typeAdd)

  return (
    <>
      <article className="md:px-5 w-full flex flex-col items-center gap-5">
        <div
          className={`w-[4.375rem] h-[4.375rem] rounded-[2.1875rem] aspect-square mb-[calc(2.5rem_-_1.125rem)] relative z-10 flex items-center justify-center bg-grey-field`}
        >
          <div className={cx("w-8 h-8 *:w-8 *:h-8")}>
            {typeAdd === EnumTypeProvider.alert ? (
              <IconAlertCirlceRed />
            ) : typeAdd === EnumTypeProvider.discussion ? (
              <IconDiscussionBalloon />
            ) : typeAdd === EnumTypeProvider.offer ? (
              <IconOffer3d />
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
          Готово!
          {/* {typeAdd && title.has(typeAdd) ? title.get(typeAdd) : null} */}
        </h2>
        <p className="text-text-primary text-center text-sm font-normal">
          {typeAdd && description.has(typeAdd) ? description.get(typeAdd) : null}
        </p>
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

SuccessNewOptional.displayName = "SuccessNewOptional"
export default SuccessNewOptional
