"use client"

import { type IUserResponse } from "@/services/users/types"

import { IconSprite } from "@/components/icons/icon-sprite"

import { dispatchCloseMenuMobileOnUser } from "@/store"
import { useNavigator } from "@/helpers/hooks/use-navigator"

const LABEL = "Поделиться"

function ButtonShareMenuMobile({ user }: { user: IUserResponse }) {
  const { id, profile } = user ?? {}

  const linkUser = `/user/${id}${
    profile?.username && !profile?.username.includes("$") && !profile?.username.includes("/") ? `/${profile?.username}` : ""
  }`

  const onShare = useNavigator({
    url: linkUser,
    title: user?.profile?.firstName ?? "Имя",
  })

  function handle() {
    onShare()
    dispatchCloseMenuMobileOnUser()
  }

  return (
    <button type="button" title={LABEL} aria-label={LABEL} aria-labelledby={LABEL} onClick={handle}>
      <div className="relative w-5 h-5">
        <IconSprite id="icon-share" className="w-5 h-5 text-text-primary" />
      </div>
      <span className="text-text-primary">{LABEL}</span>
    </button>
  )
}

ButtonShareMenuMobile.displayName = "ButtonShareMenuMobile"
export default ButtonShareMenuMobile
