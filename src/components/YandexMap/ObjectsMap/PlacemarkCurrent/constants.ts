import { alertBallon } from "../Balloons/alert"
import { offerBallon } from "../Balloons/offer"
import { discussionBallon } from "../Balloons/discussion"
import type {
    IAlertBalloon,
    IOfferBallon,
    IDiscussionBallon,
    IRequestBallon,
} from "../Balloons/types/types"
import type { TTypeProvider } from "@/services/file-upload/types"
import { requestBallon } from "../Balloons/request"

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
}

export const BALLON_TYPE: Record<
    TTypeProvider,
    (
        values: IAlertBalloon &
            IOfferBallon &
            IDiscussionBallon &
            IRequestBallon,
    ) => string
> = {
    request: requestBallon,
    profile: () => "",
    offer: offerBallon,
    alert: alertBallon,
    discussion: discussionBallon,
}
