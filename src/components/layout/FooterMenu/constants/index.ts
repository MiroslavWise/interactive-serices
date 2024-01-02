import type { IItemsMenu } from "../types"

export const MENU_ITEMS = (isAuth: boolean | undefined): IItemsMenu[] => [
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
        path: isAuth ? "offers" : null,
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
        path: isAuth ? "messages" : null,
        icon: {
            fill: "/icons/mobile/fill/message-filled.svg",
            regular: "/icons/mobile/regular/message-regular.svg",
        },
        isCenter: false,
        key: "id-messages-menu-footer",
    },
    {
        label: isAuth ? "Профиль" : "Войти",
        path: isAuth ? "profile" : null,
        icon: {
            fill: "/icons/mobile/fill/profile-active-filled.svg",
            regular: "/icons/mobile/regular/profile-active-regular.svg",
        },
        isCenter: false,
        key: "id-profile-menu-footer",
    },
]
