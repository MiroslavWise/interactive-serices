import { Dispatch, memo, SetStateAction, useState } from "react"

import { IUserResponse } from "@/services/users/types"
import { IResponseOffers } from "@/services/offers/types"

import IconActivity from "@/components/icons/IconActivity"
import IconAlertCircle from "@/components/icons/IconAlertCircle"
import { ITEMS_LINK } from "@/components/common/maps/CopyLinks"

import { dispatchComplaintModalUser } from "@/store"

export const PopupShared = memo(
  ({
    offer,
    visible,
    user,
    setVisible,
  }: {
    offer: IResponseOffers
    visible: boolean
    user: IUserResponse
    setVisible: Dispatch<SetStateAction<boolean>>
  }) => {
    const [state, setState] = useState(true)

    function handle() {
      if (user) {
        dispatchComplaintModalUser({
          visible: true,
          user: user,
        })
        return
      }
    }

    return (
      <article data-active={visible}>
        {state ? (
          <>
            <a
              onClick={(event) => {
                event.stopPropagation()
                setVisible(true)
                requestAnimationFrame(() => {
                  setState(false)
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
          <>
            {ITEMS_LINK({ offer }).map((item) => (
              <a key={`::key::copy::${item.label}::popup::`} onClick={item.linkCopy}>
                <div data-icon>{item.icon}</div>
                <span>{item.label}</span>
              </a>
            ))}
          </>
        )}
      </article>
    )
  },
)
