import type { ILinkSocial } from "../types/types"

export const ITEMS_SOCIAL_LINK: ILinkSocial[] = [
    {
        value: "google",
        srcWorking: "/icons/fill/google.svg",
        srcNotWorking: "/icons/fill/disabled/google.svg",
        path: "/google/login",
        isWorkingLink: true,
    },
    {
        value: "telegram",
        srcWorking: "/icons/fill/telegram.svg",
        srcNotWorking: "/icons/fill/disabled/telegram.svg",
        path: "/api/auth/signin",
        isWorkingLink: false,
    },
    {
        value: "apple",
        srcWorking: "/icons/fill/apple.svg",
        srcNotWorking: "/icons/fill/disabled/apple.svg",
        path: "/apple/login",
        isWorkingLink: false,
    },
    {
        value: "vk",
        srcWorking: "/icons/fill/vk.svg",
        srcNotWorking: "/icons/fill/vk.svg",
        path: "/vk/login",
        isWorkingLink: false,
    },
    {
        value: "yandex",
        srcWorking: "/icons/fill/yandex.svg",
        srcNotWorking: "/icons/fill/disabled/apple.svg",
        path: "/yandex/login",
        isWorkingLink: true,
    },
]
