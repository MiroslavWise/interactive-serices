"use client"

import { EnumTypeProvider } from "@/types/enum"

import { Button } from "@/components/common"
import IconCheck from "@/components/icons/IconCheck"

import { dispatchModalClose, useAddCreateModal } from "@/store"
import IconAlertBalloon from "@/components/icons/IconAlertBalloon"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"
import IconOffer3d from "@/components/icons/IconOffer3d"

const title: Map<EnumTypeProvider, string> = new Map([
  [EnumTypeProvider.alert, "Мы скоро разместим SOS-сообщение на карте"],
  [EnumTypeProvider.discussion, "Мы скоро разместим Дискуссию на карте"],
  [EnumTypeProvider.offer, "Отлично! Мы скоро разместим Предложение на карте"],
])

const description: Map<EnumTypeProvider, string> = new Map([
  [
    EnumTypeProvider.alert,
    "Ваше SOS-сообщение сейчас отправлено на модерацию, после проверки вы получите уведомление об этом в личном кабинете",
  ],
  [
    EnumTypeProvider.discussion,
    "Ваша дискуссия сейчас отправлена на модерацию, после проверки вы получите уведомление об этом в личном кабинете",
  ],
  [
    EnumTypeProvider.offer,
    "Ваше предложение сейчас отправлено на модерацию, после проверки вы получите уведомление об этом в личном кабинете",
  ],
])

function SuccessNewOptional() {
  const typeAdd = useAddCreateModal(({ typeAdd }) => typeAdd)

  return (
    <>
      <article>
        <div data-icon={typeAdd}>
          <div data-svg>
            {typeAdd === EnumTypeProvider.alert ? (
              <IconAlertBalloon />
            ) : typeAdd === EnumTypeProvider.discussion ? (
              <IconDiscussionBalloon />
            ) : typeAdd === EnumTypeProvider.offer ? (
              <IconOffer3d />
            ) : null}
          </div>
          <div data-check>
            <IconCheck />
          </div>
        </div>
        <h2>{typeAdd && title.has(typeAdd) ? title.get(typeAdd) : null}</h2>
        <p>{typeAdd && description.has(typeAdd) ? description.get(typeAdd) : null}</p>
      </article>
      <Button
        type="button"
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
