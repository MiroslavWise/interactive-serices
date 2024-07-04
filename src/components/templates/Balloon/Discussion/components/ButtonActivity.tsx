"use client"

import { type IResponseOffers } from "@/services/offers/types"

import IconActivity from "@/components/icons/IconActivity"

import env from "@/config/environment"
import { encryptedOffer } from "@/helpers/cript"
import { useToast } from "@/helpers/hooks/useToast"

const LABEL = "Поделиться"

export const ButtonActivity = ({ offer }: { offer: IResponseOffers }) => {
  const { onSimpleMessage } = useToast()

  return (
    <>
      <button
        type="button"
        data-activity
        onClick={(event) => {
          const hash = encryptedOffer(offer.id)
          const url = `${env.server.host}/offer/${hash}`
          if (!!window.navigator.share!) {
            navigator.share({
              title: offer.title!,
              text: offer?.addresses[0] ? offer.addresses[0]?.additional! : "",
              url: url,
            })
          } else {
            navigator.clipboard.writeText(url)
            onSimpleMessage("Ссылка скопирована")
          }
          event.stopPropagation()
        }}
        title={LABEL}
        aria-label={LABEL}
        aria-labelledby={LABEL}
      >
        <IconActivity />
      </button>
    </>
  )
}
