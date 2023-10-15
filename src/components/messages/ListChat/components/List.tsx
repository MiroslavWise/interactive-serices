"use client"

import { isMobile } from "react-device-detect"
import { useQueries, useQuery } from "react-query"
import { memo, useEffect, useMemo } from "react"

import type { IFiltersItems, TList } from "./types/types"

import { ItemListChat } from "./ItemListChat"
import { MotionUL } from "@/components/common/Motion"

import { useAuth } from "@/store/hooks"
import { serviceUsers } from "@/services/users"
import { serviceThreads } from "@/services/threads"

import styles from "./styles/style.module.scss"

const $List: TList = ({ provider, search, setTotal }) => {
    const { userId } = useAuth()

    /* const { data } = useQuery({
        queryFn: () =>
            serviceThreads.get({ user: userId!, provider: provider }),
        queryKey: ["threads", `user=${userId}`, `provider=${provider}`],
        refetchOnMount: true,
    }) */
    const { data } = useQuery({
        queryFn: () => serviceThreads.get({ user: userId! }),
        queryKey: ["threads", `user=${userId}`],
        refetchOnMount: true,
    })

    const arrayUsers = useQueries(
        data?.res?.map((item) => {
            const idUser =
                Number(item?.emitterId) === Number(userId)
                    ? Number(item?.receiverIds[0])
                    : Number(item?.emitterId)
            return {
                queryFn: () => serviceUsers.getId(Number(idUser)),
                queryKey: ["user", idUser],
                enabled: !!data?.res,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                refetchIntervalInBackground: false,
            }
        }) || [],
    )

    const items: IFiltersItems[] = useMemo(() => {
        const ITEMS: IFiltersItems[] = []
        if (data?.res && arrayUsers?.every((item) => !item.isLoading)) {
            for (const item of data?.res) {
                const idUser =
                    Number(item?.emitterId) === Number(userId)
                        ? Number(item?.receiverIds[0])
                        : Number(item?.emitterId)
                const people = arrayUsers.find(
                    (item) =>
                        Number(item?.data?.res?.id) === Number(idUser) &&
                        item?.data?.res?.profile,
                )
                if (people) {
                    ITEMS.push({
                        thread: item!,
                        people: people?.data?.res!,
                    })
                }
            }
        }

        return ITEMS
    }, [arrayUsers, data, userId])

    const filters: IFiltersItems[] = useMemo(() => {
        return (
            items?.filter(
                (item) =>
                    `${item?.people?.profile?.firstName} ${item?.people?.profile?.lastName}`
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase()),
            ) || []
        )
    }, [items, search])

    useEffect(() => {
        setTotal(filters?.length || 0)
    }, [filters, setTotal])

    return (
        <MotionUL
            classNames={[
                isMobile ? styles.containerListMobile : styles.containerList,
            ]}
        >
            {filters?.map((item, index) => (
                <ItemListChat
                    key={`${item?.thread?.id}-${index}-item-chat`}
                    {...item}
                    last={index < filters.length - 1}
                />
            ))}
        </MotionUL>
    )
}

export const List = memo($List)
