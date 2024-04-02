import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store"
import { getThreads } from "@/services"

export const useCountMessagesNotReading = () => {
  const userId = useAuth(({ userId }) => userId)

  const {
    data,
    refetch: refetchCountMessages,
    isLoading,
  } = useQuery({
    queryFn: () =>
      getThreads({
        user: userId!,
        order: "DESC",
        messagesLimit: 1,
        messagesOrder: "DESC",
      }),
    queryKey: ["threads", { user: userId }],
    refetchOnMount: true,
    enabled: !!userId,
  })

  const count = useMemo(() => {
    if (data?.res && Array.isArray(data?.res) && userId) {
      const array: any[] = []

      for (const item of data?.res) {
        if (item?.messages?.length > 0) {
          if (item?.messages[0]?.emitterId !== userId) {
            if (!item?.messages[0]?.readIds?.includes(userId)) {
              array.push(item)
            }
          }
        }
      }

      return array?.length || 0
    }
    return null
  }, [data?.res, userId])

  return { count, refetchCountMessages, data, isLoading }
}
