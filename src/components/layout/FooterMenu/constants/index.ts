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
        key: "id-map-menu-footer",
    },
    {
        label: "Обмен",
        path: is ? "offers" : null,
        icon: {
            fill: "/icons/mobile/fill/sharing-filled.svg",
            regular: "/icons/mobile/regular/sharing-regular.svg",
        },
        isCenter: false,
        key: "id-offer-menu-footer",
    },
    {
        label: "Создать",
        path: null,
        icon: {
            fill: "/svg/plus.svg",
            regular: "/svg/plus.svg",
        },
        isCenter: true,
        key: "id-create-menu-footer",
    },
    {
        label: "Сообщения",
        path: is ? "messages" : null,
        icon: {
            fill: "/icons/mobile/fill/message-filled.svg",
            regular: "/icons/mobile/regular/message-regular.svg",
        },
        isCenter: false,
        key: "id-messages-menu-footer",
    },
    {
        label: "Профиль",
        path: is ? "profile" : null,
        icon: {
            fill: "/icons/mobile/fill/profile-active-filled.svg",
            regular: "/icons/mobile/regular/profile-active-regular.svg",
        },
        isCenter: false,
        key: "id-profile-menu-footer",
    },
]
