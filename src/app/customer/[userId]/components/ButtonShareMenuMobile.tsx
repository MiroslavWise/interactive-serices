"use client"

import { type IUserResponse } from "@/services/users/types"

import IconShare from "@/components/icons/IconShare"

import env from "@/config/environment"
import { encryptedUser } from "@/helpers/cript"
import { dispatchCloseMenuMobileOnUser } from "@/store"

const LABEL = "Поделиться"

function ButtonShareMenuMobile({ user }: { user: IUserResponse }) {
  const { id, profile } = user ?? {}

  function handle() {
    if (!!window.navigator.share!) {
      const hashUser = encryptedUser(id)
      const linkUser = `/user/${hashUser}`
      const url = `${env.server.host}${linkUser}`
      navigator.share({
        title: `${profile?.firstName || "Имя"} ${profile?.lastName || "Фамилия"}`,
        text: profile?.about || "",
        url: url,
      })
    }
    dispatchCloseMenuMobileOnUser()
  }

  return (
    <button type="button" title={LABEL} aria-label={LABEL} aria-labelledby={LABEL} onClick={handle}>
      <div>
        <IconShare />
      </div>
      <span className="text-text-primary">{LABEL}</span>
    </button>
  )
}

ButtonShareMenuMobile.displayName = "ButtonShareMenuMobile"
export default ButtonShareMenuMobile
