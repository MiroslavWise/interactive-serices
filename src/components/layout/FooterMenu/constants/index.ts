import type { IItemsMenu } from "../types"

export const MENU_ITEMS = (is: boolean | undefined): IItemsMenu[] => [
    {
        label: "Карта",
        path: "",
        icon: {
            fill: "/icons/mobile/fill/map-filled.svg",
            regular: "/icons/mobile/regular/map-regular.svg",
        },
        isCenter: false,
        key: "MAPS_LAYOUT_MENU",
    },
    {
        label: "Обмен",
        path: is ? "offers" : null,
        icon: {
            fill: "/icons/mobile/fill/sharing-filled.svg",
            regular: "/icons/mobile/regular/sharing-regular.svg",
        },
        isCenter: false,
        key: "OFFER_LAYOUT_MENU",
    },
    {
        label: is ? "Профиль" : "Войти",
        path: is ? "profile" : null,
        icon: {
            fill: is
                ? "/icons/mobile/fill/profile-active-filled.svg"
                : "/icons/mobile/fill/profile-no-auth-filled.svg",
            regular: is
                ? "/icons/mobile/regular/profile-active-regular.svg"
                : "/icons/mobile/regular/profile-no-auth-regular.svg",
        },
        isCenter: true,
        key: "AUTH_OR_PROFILE_LAYOUT_MENU",
    },
    {
        label: "Сообщения",
        path: is ? "messages" : null,
        icon: {
            fill: "/icons/mobile/fill/message-filled.svg",
            regular: "/icons/mobile/regular/message-regular.svg",
        },
        isCenter: false,
        key: "MESSAGES_LAYOUT_MENU",
    },
    {
        label: "Новости",
        path: "news",
        icon: {
            fill: "/icons/mobile/fill/blog-filled.svg",
            regular: "/icons/mobile/regular/blog-regular.svg",
        },
        isCenter: false,
        key: "BLOGS_LAYOUT_MENU",
    },
]
