type TPathProfile = "/profile" | "/offers" | "/messages" | "/notifications"

interface ILinksProfile {
    path: TPathProfile
    label: string
    icon: string
}

export const LINKS_PROFILE: ILinksProfile[] = [
    {
        path: "/profile",
        label: "Профиль",
        icon: "/icons/mobile/fill/profile-active-filled.svg",
    },
    {
        path: "/offers",
        label: "Предложения обменов",
        icon: "/icons/mobile/fill/sharing-filled.svg",
    },
    {
        path: "/messages",
        label: "Сообщения",
        icon: "/icons/mobile/fill/message-filled.svg",
    },
]
