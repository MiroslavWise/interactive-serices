import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/store"
import { getThreads } from "@/services"

export const useCountMessagesNotReading = (value?: boolean) => {
  const { id } = useAuth(({ auth }) => auth) ?? {}

  const {
    data: dataThread,
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
    enabled: !!id && (typeof value === "boolean" ? value : true),
  })

  const { data } = dataThread ?? {}

  const count = useMemo(() => {
    if (data && Array.isArray(data) && id) {
      const array: any[] = []

      for (const item of data) {
        if (item?.messages?.length > 0) {
          if (item?.messages[0]?.emitterId !== id) {
            if (!item?.messages[0]?.readIds?.includes(id)) {
              array.push(item)
            }
          }
        }
      }

      return array?.length ?? 0
    }
    return null
  }, [data, id])

  return { count, refetchCountMessages, data: data ?? [], isLoading }
}
