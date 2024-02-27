"use client"

import dayjs from "dayjs"
import { DispatchWithoutAction, ReactNode } from "react"

import { IResponseOffers } from "@/services/offers/types"

import { IconVK } from "@/components/icons/IconVK"
import { IconLink } from "@/components/icons/IconLink"
import { IconWhatsApp } from "@/components/icons/IconWhatsApp"
import { IconTelegram } from "@/components/icons/IconTelegram"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { daysAgo, useOutsideClickEvent } from "@/helpers"

interface ITemsLinkSocial {
  icon: ReactNode
  label: string
  linkCopy?: DispatchWithoutAction
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

export const HeaderTimeDots = ({ offer }: { offer: IResponseOffers }) => {
  const [visible, setVisible, ref] = useOutsideClickEvent()

  const objCopy = {
    link() {
      const w = window.btoa(unescape(encodeURIComponent(`offer_id:${offer.id}`)))
      const currentUrl = window.location.href

      const url = `${currentUrl}offer#${w}`

      navigator.clipboard.writeText(url)
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
    <div data-time-dots>
      <time dateTime={offer.created as string}>
        {daysAgo(offer.created)} {dayjs(offer.created).format("HH:mm ")}
      </time>
      <div data-dots-and-button>
        <button
          ref={ref}
          onClick={(event) => {
            event.stopPropagation()
            setVisible(true)
          }}
        />
        <IconDotsHorizontal />
        <article data-visible={visible}>
          {ITEMS_LINK({ ...objCopy }).map((item) => (
            <a
              key={`::key::copy::${item.label}::`}
              onClick={(event) => {
                event.stopPropagation()
                if (item.linkCopy) {
                  item.linkCopy()
                }
                setVisible(false)
              }}
            >
              <div data-icon>{item.icon}</div>
              <span>{item.label}</span>
            </a>
          ))}
        </article>
      </div>
    </div>
  )
}
