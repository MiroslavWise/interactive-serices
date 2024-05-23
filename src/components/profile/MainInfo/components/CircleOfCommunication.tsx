"use client"

import Link from "next/link"
import { memo, useMemo } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"

import type { IUserResponse } from "@/services/users/types"

import { BlockOther } from "./BlockOther"
import { NextImageMotion } from "@/components/common"

import { cx } from "@/lib/cx"
import { serviceFriends } from "@/services"

import styles from "../styles/circle-of-communication.module.scss"

export const CircleOfCommunication = memo(function $CircleOfCommunication({ user }: { user: IUserResponse }) {
  const { data, isLoading } = useQuery({
    queryFn: () => serviceFriends.getId(user?.id!),
    queryKey: ["friends", `user=${user?.id!}`],
    enabled: !!user?.id,
  })

  const peoples = useMemo(() => {
    if (!data?.res || !data?.res?.length) return null

    return data?.res
  }, [data?.res])

  return Array.isArray(peoples) ? (
    <BlockOther label="Круг общения">
      {isLoading || !user
        ? [1, 2, 3, 4, 5].map((item) => <div className={cx(styles.moreSkeleton, "skeleton")} key={`${item}-skeleton`} />)
        : peoples
        ? peoples?.slice(0, 6)?.map((item, index) => (
            <Link key={`${item?.id}-image-${index}`} href={{ query: { id: item.id } }} className={styles.people}>
              <NextImageMotion src={item?.image?.attributes?.url!} alt="avatar" width={48} height={48} />
            </Link>
          ))
        : null}
      {peoples && peoples?.length >= 7 ? (
        <div className={styles.more}>
          <p>+{peoples?.length - 6}</p>
        </div>
      ) : null}
    </BlockOther>
  ) : null
})
