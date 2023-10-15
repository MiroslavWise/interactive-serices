import { useQuery } from "react-query"

import type { TItemComment } from "../types/types"

import { NextImageMotion } from "@/components/common/Image"

import { daysAgo } from "@/helpers"
import { serviceUsers } from "@/services/users"

export const ItemComment: TItemComment = (props) => {
    const { id, userId, message, created } = props ?? {}

    const { data } = useQuery({
        queryFn: () => serviceUsers.getId(userId!),
        queryKey: ["user", userId],
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    return (
        <li>
            <header>
                <div data-avatar-name>
                    <NextImageMotion
                        src={data?.res?.profile?.image?.attributes?.url!}
                        alt="avatar"
                        width={400}
                        height={400}
                    />
                    <p>
                        {data?.res?.profile?.firstName || " "}{" "}
                        {data?.res?.profile?.lastName || " "}
                    </p>
                </div>
                <p>{daysAgo(created)}</p>
            </header>
            <p>{message}</p>
        </li>
    )
}
