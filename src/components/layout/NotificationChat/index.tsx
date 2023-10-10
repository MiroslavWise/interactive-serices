import { toast } from "react-toastify"
import { useQuery } from "react-query"
import { useTheme } from "next-themes"

import type { IProps } from "./types"
import { serviceProfile } from "@/services/profile"

export const NotificationChat = (values: IProps) => {
    const { emitterId, threadId, message } = values ?? {}
    const { systemTheme } = useTheme()
    // const { data } = useQuery(["profile", emitterId], () =>
    //     profileService.getProfileThroughUserId(emitterId!),
    // )

    return ""
}
