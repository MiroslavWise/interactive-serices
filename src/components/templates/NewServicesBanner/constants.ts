import type { INewCreateBadge } from "./types/types"

export const NEW_CREATE_BADGES: INewCreateBadge[] = [
    {
        imageSrc: "/svg/3d/3d-speaker.svg",
        label: "Предложение",
        value: "offer",
    },
    {
        imageSrc: "/svg/3d/3d-sos.svg",
        label: "SOS",
        value: "alert",
    },
    {
        imageSrc: "/svg/3d/3d-attach.svg",
        label: "Запись в блоге",
        value: null,
    },
    {
        imageSrc: "/svg/3d/3d-message.svg",
        label: "Обсуждение",
        value: "discussion",
    },
]
export const NEW_CREATE_BADGES_ALERT_OR_DISCUSSION = NEW_CREATE_BADGES.concat({
    imageSrc: "/png/create-requests/add-request.png",
    label: "Запрос",
    value: "request",
}).filter((item) =>
    ["discussion", "alert", "offer", "request"].includes(item.value!),
)
