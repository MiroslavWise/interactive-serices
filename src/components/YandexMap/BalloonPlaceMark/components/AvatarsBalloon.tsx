import { useMemo } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"

import type { TAvatarsBalloon } from "../types/types"

import { NextImageMotion } from "@/components/common/Image"

import { serviceProfile } from "@/services/profile"
import { serviceComments } from "@/services/comments"
import { serviceOffersThreads } from "@/services/offers-threads"

import styles from "../styles/avatars-balloon.module.scss"

export const AvatarsBalloon: TAvatarsBalloon = ({ offerId }) => {
    const { data } = useQuery({
        queryFn: () =>
            serviceOffersThreads.get({
                offer: offerId,
            }),
        queryKey: ["offers-threads", offerId!],
        enabled: !!offerId!,
    })

    const currentOffersThreads = useMemo(() => {
        return data?.res?.find((item) => item?.offerId === offerId) || null
    }, [data?.res, offerId])

    const { data: dataComments } = useQuery({
        queryFn: () =>
            serviceComments.get({ offer: currentOffersThreads?.id! }),
        queryKey: ["comments", `offer=${currentOffersThreads?.id!}`],
        enabled: !!currentOffersThreads?.id!,
    })

    const currentComments = useMemo(() => {
        return (
            dataComments?.res?.filter(
                (item) => item.offerThreadId === currentOffersThreads?.id,
            ) || []
        )
    }, [dataComments, currentOffersThreads])

    const users = useMemo(() => {
        const set = new Set([...currentComments.map((item) => item?.userId)])
        return Array.from(set)
    }, [currentComments])

    const dataUsers = useQueries({
        queries: users.map((item) => ({
            queryFn: () => serviceProfile.getUserId(item!),
            queryKey: ["profile", `userId=${item}`],
            enabled: !!item,
        })),
    })

    const usersAvatar = useMemo(() => {
        if (dataUsers.every((item) => !item?.isLoading)) {
            return dataUsers?.map(
                (item) => item?.data?.res?.image?.attributes?.url!,
            )
        }
        return null
    }, [dataUsers])

    console.log("usersAvatar: ", usersAvatar)

    return (
        <ul className={styles.container}>
            {usersAvatar
                ? usersAvatar
                      .slice(0, 6)
                      .map((item, index) => (
                          <NextImageMotion
                              key={item! + index}
                              src={item}
                              alt="avatar"
                              height={80}
                              width={80}
                          />
                      ))
                : null}
        </ul>
    )
}
