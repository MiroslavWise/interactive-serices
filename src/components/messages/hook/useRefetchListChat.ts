"use client"

import { useQueries } from "react-query"

import { useAuth } from "@/store/hooks"
import { serviceThreads } from "@/services/threads"
import { TTypeProviderThreads } from "@/services/threads/types"

export const useRefetchListChat = () => {
    const { userId } = useAuth()
    const [{ refetch: refetchPersonal }, { refetch: refetchBarter }] =
        useQueries([
            {
                queryFn: () =>
                    serviceThreads.get({
                        user: userId!,
                        provider: "personal",
                        order: "DESC",
                        messagesLimit: 1,
                        messagesOrder: "DESC",
                    }),
                queryKey: ["threads", `user=${userId}`, `provider=personal`],
                enabled: false,
            },
            {
                queryFn: () =>
                    serviceThreads.get({
                        user: userId!,
                        provider: "barter",
                        order: "DESC",
                        messagesLimit: 1,
                        messagesOrder: "DESC",
                    }),
                queryKey: ["threads", `user=${userId}`, `provider=barter`],
                enabled: false,
            },
        ])

    async function refreshThreads(value: TTypeProviderThreads) {
        if (value === "barter") {
            return refetchBarter()
        } else if (value === "personal") {
            return refetchPersonal()
        } else {
            return Promise.all([refetchPersonal(), refetchBarter()])
        }
    }

    return refreshThreads
}
