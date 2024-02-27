"use client"

import dayjs from "dayjs"
import { DispatchWithoutAction, ReactNode, useEffect } from "react"

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

interface IPropsLink {
  link: DispatchWithoutAction
}

function ITEMS_LINK({ link }: IPropsLink): ITemsLinkSocial[] {
  return [
    {
      icon: <IconLink />,
      label: "Скопировать ссылку",
      linkCopy: link,
    },
    {
      icon: <IconWhatsApp />,
      label: "WhatApp",
    },
    {
      icon: <IconTelegram />,
      label: "Телеграм",
    },
    {
      icon: <IconVK />,
      label: "Вконтакте",
    },
  ]
}

export const HeaderTimeDots = ({ offer }: { offer: IResponseOffers }) => {
  const [visible, setVisible, ref] = useOutsideClickEvent()

  const objCopy = {
    link() {
      const w = window.btoa(unescape(encodeURIComponent(`offer_id:${offer.id}`)))
      const currentUrl = window.location.href
      navigator.clipboard.writeText(`${currentUrl}offer#${w}`)
    },
  }

  return (
    <div data-time-dots>
      <time dateTime={offer.created as string}>
        {daysAgo(offer.created)} {dayjs(offer.created).format("HH:mm ")}
      </time>
      <button
        ref={ref}
        onClick={(event) => {
          event.stopPropagation()
          setVisible(true)
        }}
      >
        <IconDotsHorizontal />
        <article data-visible={visible}>
          {ITEMS_LINK({ link: objCopy.link }).map((item) => (
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
      </button>
    </div>
  )
}
