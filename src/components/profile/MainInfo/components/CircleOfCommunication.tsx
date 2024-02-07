"use client"

import Link from "next/link"
import { memo, useMemo } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"

import type { IUserResponse } from "@/services/users/types"

import { BlockOther } from "./BlockOther"
import { NextImageMotion } from "@/components/common"

import { cx } from "@/lib/cx"
import { serviceFriends, serviceProfile } from "@/services"

import styles from "../styles/circle-of-communication.module.scss"

export const CircleOfCommunication = memo(function $CircleOfCommunication({ user }: { user: IUserResponse }) {
    const { data, isLoading } = useQuery({
        queryFn: () => serviceFriends.getId(user?.id!),
        queryKey: ["friends", `user=${user?.id!}`],
        enabled: !!user?.id,
    })

    const peoples = useMemo(() => {
        if (!data?.res || !data?.res?.length) return null

        return data?.res?.map((item) => item?.id!)
    }, [data?.res])

    const dataProfiles = useQueries({
        queries: !!peoples
            ? peoples.map((item) => ({
                  queryFn: () => serviceProfile.getUserId(item!),
                  queryKey: ["profile", item!],
                  enabled: !!peoples && !!item,
              }))
            : [],
    })

    const profiles = useMemo(() => {
        if (dataProfiles?.every((item) => !!item?.data?.res)) {
            return dataProfiles?.map((item) => ({
                id: item?.data?.res?.userId,
                photo: item?.data?.res?.image?.attributes?.url!,
            }))
        }

        return null
    }, [dataProfiles])

    const isLoader = useMemo(() => {
        return dataProfiles.some((item) => item.isLoading)
    }, [dataProfiles])

    return profiles && profiles?.length > 0 ? (
        <BlockOther label="Круг общения">
            {profiles
                ? profiles?.slice(0, 6)?.map((item, index) => (
                      <Link key={`${item?.id}-image-${index}`} href={{ query: { id: item.id } }} className={styles.people}>
                          <NextImageMotion src={item?.photo!} alt="avatar" width={48} height={48} />
                      </Link>
                  ))
                : isLoader || isLoading || !user
                ? [1, 2, 3, 4, 5].map((item) => <div className={cx(styles.moreSkeleton, "skeleton")} key={`${item}-skeleton`} />)
                : null}
            {profiles && profiles?.length >= 7 ? (
                <div className={styles.more}>
                    <p>+{profiles?.length - 6}</p>
                </div>
            ) : null}
        </BlockOther>
    ) : null
})
