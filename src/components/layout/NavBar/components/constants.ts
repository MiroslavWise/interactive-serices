type TPathProfile = "/profile" | "/offers" | "/messages" | "/notifications"

interface ILinksProfile {
    path: TPathProfile
    label: string
    icon: string
}

export const LINKS_PROFILE: ILinksProfile[] = [
    {
        path: "/messages",
        label: "Сообщения",
        icon: "/icons/mobile/fill/message-filled.svg",
    },
]
