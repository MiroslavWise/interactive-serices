"use client"

import { type IUserOffer } from "@/services/offers/types"
import { type IUserResponse } from "@/services/users/types"

import { SpriteDefault } from "@/components/icons/icon-sprite-default"

import { dispatchCloseMenuMobileOnUser, dispatchComplaintModalUser } from "@/store"

const LABEL = "Пожаловаться"

function ButtonComplaintMenuMobile({ user }: { user: IUserResponse }) {
  const { id, profile } = user ?? {}

  const { about, birthdate, firstName, lastName = "", gender, username = "", image } = profile ?? {}

  function handle() {
    const data: IUserOffer = {
      about: about || null,
      birthdate: birthdate || null,
      firstName: firstName || "Имя",
      lastName: lastName,
      gender: gender || null,
      id: id,
      username: username,
      image: image,
    }

    dispatchComplaintModalUser({ user: data })
    dispatchCloseMenuMobileOnUser()
  }

  return (
    <button type="button" title={LABEL} aria-label={LABEL} aria-labelledby={LABEL} onClick={handle}>
      <div>
        <SpriteDefault id="icon-complaint" className="text-text-error w-5 h-5" />
      </div>
      <span className="text-text-error">{LABEL}</span>
    </button>
  )
}

ButtonComplaintMenuMobile.displayName = "ButtonComplaintMenuMobile"
export default ButtonComplaintMenuMobile
