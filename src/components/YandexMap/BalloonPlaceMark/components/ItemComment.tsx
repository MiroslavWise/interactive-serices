import { useQuery } from "@tanstack/react-query"

import type { TItemComment } from "../types/types"

import { NextImageMotion } from "@/components/common"

import { daysAgo } from "@/helpers"
import { getUserId } from "@/services"

export const ItemComment: TItemComment = (props) => {
  const { id, userId, message, created, isTemporary, isErrorRequest } = props ?? {}

  const { data } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  return (
    <li data-temporary={isTemporary} data-is-error={isErrorRequest}>
      <header>
        <div data-avatar-name>
          <NextImageMotion src={data?.res?.profile?.image?.attributes?.url!} alt="avatar" width={40} height={40} />
          <p>
            {data?.res?.profile?.firstName || " "} {data?.res?.profile?.lastName || " "}
          </p>
        </div>
        <p>{daysAgo(created!)}</p>
      </header>
      <p>{message}</p>
    </li>
  )
}
