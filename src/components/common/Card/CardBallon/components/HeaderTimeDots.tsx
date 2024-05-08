"use client"

import { memo } from "react"

import { IResponseOffers } from "@/services/offers/types"
import { ITEMS_LINK } from "@/components/common/maps/CopyLinks"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { useToast } from "@/helpers/hooks/useToast"
import { daysAgo, useOutsideClickEvent } from "@/helpers"

function HeaderTimeDots({ offer }: { offer: IResponseOffers }) {
  const [visible, setVisible, ref] = useOutsideClickEvent()
  const { onSimpleMessage } = useToast()

  return (
    <div data-time-dots>
      <time dateTime={String(offer.created)}>{daysAgo(offer.created)}</time>
      <div data-dots-and-button>
        <button
          ref={ref}
          onClick={(event) => {
            event.stopPropagation()
            setVisible((prev) => !prev)
          }}
        />
        <IconDotsHorizontal />
        <article data-visible={visible}>
          {ITEMS_LINK({ offer, onSimpleMessage }).map((item) => (
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

HeaderTimeDots.displayName = "HeaderTimeDots"
export default memo(HeaderTimeDots)
