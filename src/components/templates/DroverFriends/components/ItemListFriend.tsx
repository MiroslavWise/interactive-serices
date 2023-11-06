"use client"

import { useMemo, useState } from "react"
import { useQueries, useQuery } from "react-query"

import type { TItemListFriend } from "../types/types"

import { MotionLI } from "@/components/common/Motion"
import { NextImageMotion } from "@/components/common/Image"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ButtonCircleGradient } from "@/components/common/Buttons"

import { useAuth } from "@/store/hooks"
import { serviceUsers } from "@/services/users"
import { serviceFriends } from "@/services/friends"
import { TTypeFriends } from "@/store/types/createDroverFriends"
import { usePush } from "@/helpers"
import { useDroverFriends } from "@/store/state/useDroverFriends"

export const ItemListFriend: TItemListFriend = ({ id, type }) => {
    const [loading, setLoading] = useState(false)
    const { dispatchFriends } = useDroverFriends()
    const { handlePush } = usePush()
    const { userId } = useAuth()
    const { data, refetch } = useQuery({
        queryFn: () => serviceUsers.getId(id!),
        queryKey: ["users", `user=${id}`],
        enabled: !!id,
    })

    const refreshes = useQueries(
        ["list", "request", "response"].map((item) => ({
            queryFn: () =>
                serviceFriends.get(
                    ["request", "response"].includes(item)
                        ? { filter: item as Exclude<TTypeFriends, "list"> }
                        : undefined,
                ),
            queryKey: ["friends", `user=${userId}`, `filter=${item}`],
            enabled: false,
        })),
    )

    async function refresh() {
        return Promise.all(refreshes.map((item) => item.refetch()))
    }

    const geo = useMemo(() => {
        if (!data?.res?.addresses || !data?.res?.addresses?.length) {
            return null
        }

        return (
            data?.res?.addresses?.find((item) => item.addressType === "main") ||
            null
        )
    }, [data?.res])

    function handleSuccess() {
        if (!loading) {
            setLoading(true)
            serviceFriends.post({ id: id }).then((response) => {
                setTimeout(() => {
                    refresh().then((response) => {
                        console.log(
                            "%c ---response: ---",
                            "color: #0f0",
                            response,
                        )
                        requestAnimationFrame(() => {
                            setLoading(false)
                        })
                    })
                }, 850)
            })
        }
    }

    function deleteFriends() {
        if (!loading) {
            setLoading(true)
            serviceFriends.delete(id!).then((response) => {
                setTimeout(() => {
                    refresh().then((response) => {
                        console.log(
                            "%c ---response: ---",
                            "color: #0f0",
                            response,
                        )
                        requestAnimationFrame(() => {
                            setLoading(false)
                        })
                    })
                }, 850)
            })
        }
    }

    return (
        <MotionLI>
            <div data-block-profile>
                <div data-block-avatar>
                    <NextImageMotion
                        src={data?.res?.profile?.image?.attributes?.url!}
                        alt="avatar"
                        width={60}
                        height={60}
                    />
                </div>
                <div data-name-geo>
                    <h4>
                        {data?.res?.profile?.firstName}{" "}
                        {data?.res?.profile?.lastName}
                    </h4>
                    {geo ? (
                        <GeoTagging
                            location={geo?.additional!}
                            fontSize={14}
                            size={16}
                        />
                    ) : null}
                </div>
            </div>
            <div data-block-buttons>
                <ButtonCircleGradient
                    type="primary"
                    icon="/svg/message-dots-circle-primary.svg"
                    size={20}
                    handleClick={() => {
                        handlePush(`/messages?user=${id}`)
                        dispatchFriends({ visible: false })
                    }}
                />
                <ButtonCircleGradient
                    type="primary"
                    icon="/svg/x-close-primary.svg"
                    size={20}
                    loading={loading}
                    handleClick={deleteFriends}
                />
                {type === "response" ? (
                    <>
                        <ButtonCircleGradient
                            type="primary"
                            loading={loading}
                            icon="/svg/check-circle-primary.svg"
                            size={20}
                            handleClick={handleSuccess}
                        />
                    </>
                ) : null}
            </div>
        </MotionLI>
    )
}
