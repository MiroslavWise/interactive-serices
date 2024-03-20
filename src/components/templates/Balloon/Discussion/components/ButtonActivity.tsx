import { DispatchWithoutAction, ReactNode } from "react"

import IconActivity from "@/components/icons/IconActivity"
import { IconLink } from "@/components/icons/IconLink"
import { IconTelegram } from "@/components/icons/IconTelegram"
import { IconVK } from "@/components/icons/IconVK"
import { IconWhatsApp } from "@/components/icons/IconWhatsApp"

import { useOutsideClickEvent } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { IResponseOffers } from "@/services/offers/types"

interface ITemsLinkSocial {
  icon: ReactNode
  label: string
  linkCopy: DispatchWithoutAction
}

type TTypeLink = "link" | "tg" | "wa" | "vk"

function ITEMS_LINK({ link, tg, wa, vk }: Record<TTypeLink, DispatchWithoutAction>): ITemsLinkSocial[] {
  return [
    {
      icon: <IconLink />,
      label: "Скопировать ссылку",
      linkCopy: link,
    },
    {
      icon: <IconWhatsApp />,
      label: "WhatApp",
      linkCopy: wa,
    },
    {
      icon: <IconTelegram />,
      label: "Телеграм",
      linkCopy: tg,
    },
    {
      icon: <IconVK />,
      label: "Вконтакте",
      linkCopy: vk,
    },
  ]
}

export const ButtonActivity = ({ offer }: { offer: IResponseOffers }) => {
  const [visible, setVisible, ref] = useOutsideClickEvent()
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

  return (
    <>
      <button
        type="button"
        data-activity
        onClick={(event) => {
          event.stopPropagation()
          setVisible((prev) => !prev)
        }}
        ref={ref}
      >
        <IconActivity />
        <article data-shared={visible}>
          <h3>Поделиться</h3>
          {ITEMS_LINK({ ...objCopy }).map((item) => (
            <a key={`::key::copy::${item.label}::`} onClick={item.linkCopy}>
              <div data-icon>{item.icon}</div>
              <span>{item.label}</span>
            </a>
          ))}
        </article>
      </button>
    </>
  )
}
