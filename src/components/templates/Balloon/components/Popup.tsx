"use client"

import { Dispatch, SetStateAction, useMemo, useState } from "react"

import { IUserResponse } from "@/services/users/types"
import { IResponseOffers } from "@/services/offers/types"

import IconActivity from "@/components/icons/IconActivity"
import IconAlertCircle from "@/components/icons/IconAlertCircle"
import { ITEMS_LINK } from "@/components/common/maps/CopyLinks"

import { useToast } from "@/helpers/hooks/useToast"
import { dispatchComplaintModalUser } from "@/store"

export const PopupShared = ({
  offer,
  user,
  visible,
  setVisible,
}: {
  offer: IResponseOffers
  visible: boolean
  user: IUserResponse
  setVisible: Dispatch<SetStateAction<boolean>>
}) => {
  const [state, setState] = useState(true)
  const { onSimpleMessage } = useToast()

  function handle() {
    if (user) {
      dispatchComplaintModalUser({
        visible: true,
        user: user,
      })
      return
    }
  }

  const itemsLink = useMemo(
    () =>
      ITEMS_LINK({ offer, onSimpleMessage }).map((item) => (
        <a
          key={`::key::copy::${item.label}::popup::`}
          onClick={() => {
            item.linkCopy()
            setState(true)
          }}
        >
          <div data-icon>{item.icon}</div>
          <span>{item.label}</span>
        </a>
      )),
    [offer],
  )

  return (
    <article data-active={visible}>
      {state ? (
        <>
          <a
            onClick={(event) => {
              event.stopPropagation()
              setState(false)
              requestAnimationFrame(() => {
                setVisible(true)
              })
            }}
          >
            <div data-icon>
              <IconActivity />
            </div>
            <span>Поделиться</span>
          </a>
          <a onClick={handle}>
            <div data-icon>
              <IconAlertCircle />
            </div>
            <span>Пожаловаться</span>
          </a>
        </>
      ) : (
        itemsLink
      )}
    </article>
  )
}
