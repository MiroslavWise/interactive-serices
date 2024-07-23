type TPathProfile = "/profile" | "/offers" | "/chat" | "/notifications"

interface ILinksProfile {
  path: TPathProfile
  label: string
  icon: string
}

export const LINKS_PROFILE: ILinksProfile[] = [
  {
    path: "/chat",
    label: "Сообщения",
    icon: "/icons/mobile/fill/message-filled.svg",
  },
]
