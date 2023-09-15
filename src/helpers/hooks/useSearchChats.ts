import { useMemo } from "react"

import type { IResponseThreads } from "@/services/threads/types"

import { useThread } from "@/store/state/useThreads"
import { useMessages } from "@/store/state/useMessages"

export const useSearchChats = () => {
    const { threads, search, setSearch } = useThread()
    const { data } = useMessages()

    const filters: IResponseThreads[] = useMemo(() => {
        if (threads && threads.length && data) {
            const valuesNames = Object.values(data)?.filter(
                (item) =>
                    item?.name?.toLowerCase()?.includes(search.toLowerCase()),
            )

            return threads.filter((item) =>
                valuesNames.some((id) => Number(id.id) === Number(item.id)),
            )
        }

        if (threads) {
            return threads
        }

        return []
    }, [threads, search, data])

    function set(value: string) {
        setSearch(value)
    }

    return { filters, set, search }
}
