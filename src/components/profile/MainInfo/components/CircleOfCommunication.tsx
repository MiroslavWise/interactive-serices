"use client"

import { memo, useMemo } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"

import { IUserResponse } from "@/services/users/types/usersService"

import { BlockOther } from "./BlockOther"
import { NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers"
import { serviceUsers } from "@/services/users"
import { serviceFriends } from "@/services/friends"

import styles from "../styles/circle-of-communication.module.scss"

export const CircleOfCommunication = memo(function $CircleOfCommunication({
    user,
}: {
    user: IUserResponse
}) {
    const { handleReplace } = usePush()
    const { data, isLoading } = useQuery({
        queryFn: () => serviceFriends.getId(user?.id!),
        queryKey: ["friends", `user=${user?.id!}`],
        enabled: !!user?.id,
    })

    const peoples = useMemo(() => {
        if (!data?.res || !data?.res?.length) return null

        return data?.res?.map((item) => item?.id!)
    }, [data?.res])

    const dataUsers = useQueries({
        queries: !!peoples
            ? peoples.map((item) => ({
                  queryFn: () => serviceUsers.getId(item!),
                  queryKey: ["user", item],
                  enabled: !!peoples && !!item,
              }))
            : [],
    })

    console.log("%c dataUsers", "color: #f0f", dataUsers)

    const profiles = useMemo(() => {
        if (dataUsers?.every((item) => !!item?.data?.res)) {
            return dataUsers?.map((item) => ({
                id: item?.data?.res?.id,
                photo: item?.data?.res?.profile?.image?.attributes?.url!,
            }))
        }

        return null
    }, [dataUsers])

    const isLoader = useMemo(() => {
        return dataUsers.some((item) => item.isLoading)
    }, [dataUsers])

    console.log("%c profiles", "color: #0f0", profiles)

    return (
        <BlockOther label="Круг общения">
            {profiles
                ? profiles
                      ?.slice(0, 4)
                      ?.map((item, index) => (
                          <NextImageMotion
                              key={`${item?.id}-image-${index}`}
                              src={item?.photo!}
                              alt="avatar"
                              width={250}
                              height={250}
                              className={styles.people}
                              onClick={() =>
                                  handleReplace(`/user?id=${item.id}`)
                              }
                          />
                      ))
                : isLoader || isLoading || !user
                ? [1, 2, 3, 4].map((item) => (
                      <div
                          className={cx(styles.moreSkeleton, "skeleton")}
                          key={`${item}-skeleton`}
                      />
                  ))
                : null}
            {profiles && profiles?.length >= 5 ? (
                <div className={styles.more}>
                    <p>+{profiles?.length - 4}</p>
                </div>
            ) : null}
        </BlockOther>
    )
})
