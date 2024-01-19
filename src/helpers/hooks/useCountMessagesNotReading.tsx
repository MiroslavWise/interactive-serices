import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store/hooks"
import { serviceThreads } from "@/services/threads"

export const useCountMessagesNotReading = () => {
    const userId = useAuth(({ userId }) => userId)

    const {
        data,
        refetch: refetchCountMessages,
        isLoading,
    } = useQuery({
        queryFn: () =>
            serviceThreads.get({
                user: userId!,
                order: "DESC",
                messagesLimit: 1,
                messagesOrder: "DESC",
            }),
        queryKey: ["threads", { user: userId }],
        refetchOnMount: true,
    })

    const count = useMemo(() => {
        if (data?.res && Array.isArray(data?.res) && userId) {
            console.log("data LinkMessages: ", data?.res)
            const messagesForMe = data?.res
                ?.filter((item) => item.messages?.length > 0)
                ?.filter((item) => item?.messages[0]?.emitterId !== userId)
                ?.filter((item) => item?.messages[0]?.readIds?.length === 0)

            return messagesForMe?.length || 0
        }
        return null
    }, [data?.res, userId])

    return { count, refetchCountMessages, data, isLoading }
}
