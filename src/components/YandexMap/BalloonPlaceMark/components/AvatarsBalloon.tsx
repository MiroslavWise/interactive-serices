import { useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useQueries, useQuery } from "@tanstack/react-query"

import type { TAvatarsBalloon } from "../types/types"

import { NextImageMotion } from "@/components/common/Image"

import { usePush } from "@/helpers"
import { serviceProfile } from "@/services/profile"
import { serviceComments } from "@/services/comments"
import { useBalloonCard } from "@/store/state/useBalloonCard"
import { useProfilePublic } from "@/store/state/useProfilePublic"
import { serviceOffersThreads } from "@/services/offers-threads"

import styles from "../styles/avatars-balloon.module.scss"

export const AvatarsBalloon: TAvatarsBalloon = ({ offerId }) => {
    const { handlePush } = usePush()
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)
    const dispatchProfilePublic = useProfilePublic(({ dispatchProfilePublic }) => dispatchProfilePublic)

    const { data } = useQuery({
        queryFn: () =>
            serviceOffersThreads.get({
                offer: offerId,
            }),
        queryKey: ["offers-threads", offerId!],
        enabled: !!offerId!,
    })

    const currentOffersThreads = data?.res?.find((item) => item?.offerId === offerId) || null

    const { data: dataComments } = useQuery({
        queryFn: () => serviceComments.get({ offer: currentOffersThreads?.id! }),
        queryKey: ["comments", `offer=${currentOffersThreads?.id!}`],
        enabled: !!currentOffersThreads?.id!,
    })

    const currentComments = dataComments?.res?.filter((item) => item.offerThreadId === currentOffersThreads?.id) || []

    const users = Array.from(new Set([...currentComments.map((item) => item?.userId)]))

    const dataProfiles = useQueries({
        queries: users.map((item) => ({
            queryFn: () => serviceProfile.getUserId(item!),
            queryKey: ["profile", item],
            enabled: !!item,
        })),
    })

    const usersAvatar = useMemo(() => {
        if (dataProfiles.every((item) => !item?.isLoading)) {
            return dataProfiles
                ?.filter((item) => !!item?.data?.res?.image)
                ?.map((item) => ({
                    url: item?.data?.res?.image?.attributes?.url!,
                    id: item?.data?.res?.userId,
                }))
        }
        return null
    }, [dataProfiles])

    function handleUser(idUser: number) {
        if (isMobile) {
            handlePush(`/user?id=${idUser!}`)
            dispatch({ visible: false })
        } else {
            dispatchProfilePublic({
                visible: true,
                idUser: idUser!,
            })
        }
    }

    return (
        <ul className={styles.container} onClick={(event) => event.stopPropagation()}>
            {usersAvatar
                ? usersAvatar
                      .slice(0, 6)
                      .map((item, index) => (
                          <NextImageMotion onClick={() => handleUser(item?.id!)} key={item.id! + index} src={item.url!} alt="avatar" height={42} width={42} />
                      ))
                : null}
        </ul>
    )
}
