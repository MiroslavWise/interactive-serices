import type { TTypeProvider } from "@/services/file-upload/types"

export const TYPE_ICON: Record<TTypeProvider, { default: string; active: string }> = {
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
        default: "/map/circle-alert.png",
        active: "/map/default-alert-hover.png",
    },
    discussion: {
        default: "/map/circle-discussion.png",
        active: "/map/default-discussion-hover.png",
    },
    barter: {
        default: "",
        active: "",
    },
    threads: {
        default: "",
        active: "",
    },
}
