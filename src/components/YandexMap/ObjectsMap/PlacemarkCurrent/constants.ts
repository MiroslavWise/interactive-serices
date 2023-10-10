import type { TTypeProvider } from "@/services/file-upload/types"
import type {
    IAlertBalloon,
    IOfferBallon,
    IDiscussionBallon,
    IRequestBallon,
} from "./types"
import { DispatchWithoutAction } from "react"

export const TYPE_ICON: Record<
    TTypeProvider,
    { default: string; active: string }
> = {
    profile: {
        default: "",
        active: "",
    },
    request: {
        default: "",
        active: "",
    },
    offer: {
        default: "",
        active: "",
    },
    alert: {
        default: "/map/default-alert.png",
        active: "/map/default-alert-hover.png",
    },
    discussion: {
        default: "/map/default-discussion.png",
        active: "/map/default-discussion-hover.png",
    },
    "offer-request": {
        default: "",
        active: "",
    },
}
