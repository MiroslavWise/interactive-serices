"use client"

import IconActivity from "@/components/icons/IconActivity"

import { useOutsideClickEvent } from "@/helpers"
import { IResponseOffers } from "@/services/offers/types"
import { ITEMS_LINK } from "@/components/common/maps/CopyLinks"

export const ButtonActivity = ({ offer }: { offer: IResponseOffers }) => {
  const [visible, setVisible, ref] = useOutsideClickEvent()

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
          {ITEMS_LINK({ offer }).map((item) => (
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
