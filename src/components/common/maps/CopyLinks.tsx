import { DispatchWithoutAction, ReactNode } from "react"

import { IResponseOffers } from "@/services/offers/types"

import { IconLink } from "@/components/icons/IconLink"
import { IconTelegram } from "@/components/icons/IconTelegram"
import { IconVK } from "@/components/icons/IconVK"
import { IconWhatsApp } from "@/components/icons/IconWhatsApp"
import { useToast } from "@/helpers/hooks/useToast"

interface ITemsLinkSocial {
  label: string
  icon: ReactNode
  linkCopy: DispatchWithoutAction
}

export function ITEMS_LINK({ offer }: { offer: IResponseOffers }): ITemsLinkSocial[] {
  const { onSimpleMessage } = useToast()
  const objCopy = {
    link() {
      const w = window.btoa(unescape(encodeURIComponent(`offer_id:${offer.id}`)))
      const currentUrl = window.location.href

      const url = `${currentUrl}offer#${w}`

      navigator.clipboard.writeText(url)
      onSimpleMessage("Ссылка скопирована")
    },
    tg() {
      const w = window.btoa(unescape(encodeURIComponent(`offer_id:${offer.id}`)))
      const currentUrl = window.location.href

      const url = `${currentUrl}offer#${w}`

      window.location.href = `tg://msg_url?url=${url}`
    },
    wa() {
      const w = window.btoa(unescape(encodeURIComponent(`offer_id:${offer.id}`)))
      const currentUrl = window.location.href

      const url = `${currentUrl}offer#${w}`

      const shareUrl = url
      const shareText = offer.title
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)}`
      window.location.href = whatsappUrl
    },
    vk() {
      if (!!window.navigator.share!) {
        const w = window.btoa(unescape(encodeURIComponent(`offer_id:${offer.id}`)))
        const currentUrl = window.location.href

        const url = `${currentUrl}offer#${w}`

        navigator.share({
          title: offer?.title!,
          text: offer?.addresses[0]?.additional! || "",
          url: url,
        })
      }
    },
  }

  return [
    {
      icon: <IconLink />,
      label: "Скопировать ссылку",
      linkCopy: objCopy.link,
    },
    {
      icon: <IconWhatsApp />,
      label: "WhatApp",
      linkCopy: objCopy.wa,
    },
    {
      icon: <IconTelegram />,
      label: "Телеграм",
      linkCopy: objCopy.tg,
    },
    {
      icon: <IconVK />,
      label: "Вконтакте",
      linkCopy: objCopy.vk,
    },
  ]
}
