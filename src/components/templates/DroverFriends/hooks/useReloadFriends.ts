import { useQuery, useQueries } from "@tanstack/react-query"

import type { IEnabledHook } from "../types/types"

import { useAuth } from "@/store/hooks"
import { serviceFriends } from "@/services/friends"
import { TTypeFriends } from "@/store/types/createDroverFriends"
import { useMemo } from "react"

export const useReloadFriends = ({ enabled, type }: IEnabledHook) => {
    const { userId } = useAuth()

    const list: TTypeFriends[] = ["request", "response", "list"]

    const [
        { refetch: refetchRequest, data: dataRequest },
        { refetch: refetchResponse, data: dataResponse },
        { refetch: refetchList, data: dataList },
    ] = useQueries({
        queries: list.map((item) => ({
            queryFn: () =>
                serviceFriends.get(
                    ["request", "response"].includes(item!)
                        ? { filter: item as Exclude<TTypeFriends, "list"> }
                        : undefined,
                ),
            queryKey: ["friends", `user=${userId}`, `filter=${item}`],
            enabled: !!enabled,
        })),
    })

    async function refresh(values: TTypeFriends[]) {
        console.log("%c refresh: ", "color: green; font-size: 15px", values)
        return Promise.all(
            values.map((item) => {
                if (item === "list") {
                    return refetchList()
                }
                if (item === "request") {
                    return refetchRequest()
                }
                if (item === "response") {
                    return refetchResponse()
                }
            }),
        )
    }

    const data = useMemo(() => {
        if (type === "list") {
            return dataList
        }
        if (type === "request") {
            return dataRequest
        }
        if (type === "response") {
            return dataResponse
        }
    }, [type, dataList, dataRequest, dataResponse])

    return { data, refresh }
}
