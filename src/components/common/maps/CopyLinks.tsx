"use client"

import { DispatchWithoutAction, ReactNode } from "react"

import { IResponseOffers } from "@/services/offers/types"

import { IconLink } from "@/components/icons/IconLink"
import { IconTelegram } from "@/components/icons/IconTelegram"
import { IconVK } from "@/components/icons/IconVK"
import { IconWhatsApp } from "@/components/icons/IconWhatsApp"
import env from "@/config/environment"

// import { useToast } from "@/helpers/hooks/useToast"

interface ITemsLinkSocial {
  label: string
  icon: ReactNode
  linkCopy: DispatchWithoutAction
}

interface IProps {
  offer: IResponseOffers
  onSimpleMessage?: (message: string) => any
}

export function ITEMS_LINK({ offer, onSimpleMessage }: IProps): ITemsLinkSocial[] {
  const { id, title, addresses } = offer ?? {}

  const address = addresses && addresses?.length > 0 ? addresses[0] : null

  const objCopy = {
    link() {
      const w = window.btoa(unescape(encodeURIComponent(`offer_id:${id}`)))
      const url = `${env.server.host}offer#${w}`
      navigator.clipboard.writeText(url)
      if (onSimpleMessage) {
        onSimpleMessage("Ссылка скопирована")
      }
    },
    tg() {
      const w = window.btoa(unescape(encodeURIComponent(`offer_id:${id}`)))
      const url = `${env.server.host}offer#${w}`
      window.location.href = `tg://msg_url?url=${url}`
    },
    wa() {
      const w = window.btoa(unescape(encodeURIComponent(`offer_id:${id}`)))
      const url = `${env.server.host}offer#${w}`
      const shareUrl = url
      const shareText = title
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)}`
      window.location.href = whatsappUrl
    },
    vk() {
      if (!!window.navigator.share!) {
        const w = window.btoa(unescape(encodeURIComponent(`offer_id:${id}`)))
        const url = `${env.server.host}offer#${w}`
        navigator.share({
          title: title!,
          text: address ? address?.additional! : "",
          url: url,
        })
      }
    },
  }

  return [
    {
      icon: <IconLink />,
      label: "Скопировать ссылку",
      linkCopy: () => objCopy.link(),
    },
    {
      icon: <IconWhatsApp />,
      label: "WhatApp",
      linkCopy: () => objCopy.wa(),
    },
    {
      icon: <IconTelegram />,
      label: "Телеграм",
      linkCopy: () => objCopy.tg(),
    },
    {
      icon: <IconVK />,
      label: "Вконтакте",
      linkCopy: () => objCopy.vk(),
    },
  ]
}
