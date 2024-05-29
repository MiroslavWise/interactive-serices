import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { useAuth_ } from "@/store"
import { getThreads } from "@/services"

export const useCountMessagesNotReading = () => {
  const { id } = useAuth_(({ auth }) => auth) ?? {}

  const {
    data,
    refetch: refetchCountMessages,
    isLoading,
  } = useQuery({
    queryFn: () =>
      getThreads({
        user: id!,
        order: "DESC",
        messagesLimit: 1,
        messagesOrder: "DESC",
      }),
    queryKey: ["threads", { user: id }],
    refetchOnMount: true,
    enabled: !!id,
  })

  const count = useMemo(() => {
    if (data?.res && Array.isArray(data?.res) && id) {
      const array: any[] = []

      for (const item of data?.res) {
        if (item?.messages?.length > 0) {
          if (item?.messages[0]?.emitterId !== id) {
            if (!item?.messages[0]?.readIds?.includes(id)) {
              array.push(item)
            }
          }
        }
      }

      return array?.length || 0
    }
    return null
  }, [data?.res, id])

  return { count, refetchCountMessages, data, isLoading }
}
