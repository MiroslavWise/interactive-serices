"use client"

import { type IUserResponse } from "@/services/users/types"

import IconShare from "@/components/icons/IconShare"

import env from "@/config/environment"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchCloseMenuMobileOnUser } from "@/store"

const LABEL = "Поделиться"

function ButtonShareMenuMobile({ user }: { user: IUserResponse }) {
  const { id, profile } = user ?? {}
  const { onSimpleMessage } = useToast()

  function handle() {
    const userName =
      profile?.username && !profile?.username.includes("$") && !profile?.username.includes("/") ? `/${profile?.username}` : ""
    const linkUser = `/user/${id}` + userName
    const url = `${env.server.host}${linkUser}`
    if (!!window.navigator.share!) {
      navigator.share({
        title: `${profile?.firstName || "Имя"} ${profile?.lastName ?? ""}`,
        text: profile?.about || "",
        url: url,
      })
    } else {
      navigator.clipboard.writeText(url)
      onSimpleMessage("Ссылка скопирована")
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
