import type { INewCreateBadge } from "./types/types"

export const NEW_CREATE_BADGES: INewCreateBadge[] = [
    {
        imageSrc: "/svg/3d/3d-speaker.svg",
        label: "Новое предложение",
        value: "offer",
    },
    {
        imageSrc: "/svg/3d/3d-sos.svg",
        label: "Новое оповещение",
        value: "alert",
    },
    {
        imageSrc: "/svg/3d/3d-attach.svg",
        label: "Новая запись в блоге",
        value: "request",
    },
    {
        imageSrc: "/svg/3d/3d-message.svg",
        label: "Новое обсуждение",
        value: "discussion",
    },
]
