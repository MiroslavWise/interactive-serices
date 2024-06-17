"use client"

import { memo } from "react"

import { IResponseOffers } from "@/services/offers/types"
import { ITEMS_LINK } from "@/components/common/maps/CopyLinks"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { useToast } from "@/helpers/hooks/useToast"
import { daysAgo, useOutsideClickEvent } from "@/helpers"
import { cx } from "@/lib/cx"

function HeaderTimeDots({ offer }: { offer: IResponseOffers }) {
  const [visible, setVisible, ref] = useOutsideClickEvent()
  const { onSimpleMessage } = useToast()

  return (
    <div data-time-dots className="w-full h-auto flex items-center justify-between">
      <time dateTime={String(offer.created)} className="w-full text-text-secondary text-start text-xs font-normal">
        {daysAgo(offer.created)}
      </time>
      <div
        data-dots-and-button
        className="relative h-4 w-4 border-none outline-none bg-transparent flex items-center justify-center z-[91] [&>svg]:absolute [&>svg]:inset-0 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:z-[23]"
      >
        <button
          className="absolute bg-transparent border-none outline-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 z-50"
          ref={ref}
          onClick={(event) => {
            event.stopPropagation()
            setVisible((prev) => !prev)
          }}
        />
        <IconDotsHorizontal />
        <article
          className={cx(
            "absolute top-[calc(100%_+_0.25rem)] right-0 rounded-xl p-3 bg-BG-second w-[13.5rem] flex flex-col gap-0.125 opacity-0 invisible z-[120]",
            visible && "!opacity-100 !visible",
          )}
        >
          {ITEMS_LINK({ offer, onSimpleMessage }).map((item) => (
            <a
              className="w-full py-2 px-0.375 flex items-center gap-0.625 rounded-[0.375rem] bg-transparent hover:bg-grey-field focus:bg-grey-field"
              key={`::key::copy::${item.label}::`}
              onClick={(event) => {
                event.stopPropagation()
                if (item.linkCopy) {
                  item.linkCopy()
                }
                setVisible(false)
              }}
            >
              <div className="relative w-5 h-5 p-0.625 [&>svg]:absolute [&>svg]:w-5 [&>svg]:h-5 [&>svg]:indent-0">{item.icon}</div>
              <span className="text-text-primary text-sm font-normal whitespace-nowrap">{item.label}</span>
            </a>
          ))}
        </article>
      </div>
    </div>
  )
}

HeaderTimeDots.displayName = "HeaderTimeDots"
export default memo(HeaderTimeDots)
