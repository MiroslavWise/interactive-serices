import Image from "next/image"
import { useQueries } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"

import type { TBlockLikes } from "../types/types"

import { useAuth } from "@/store/hooks"
import { serviceLikes } from "@/services/likes"

import styles from "../styles/likes.module.scss"

export const BlockLikes: TBlockLikes = ({ id }) => {
    const { userId } = useAuth()
    const [loading, setLoading] = useState(false)
    const [{ data: dataLikesMy, refetch: refetchLikesMy }, { data, refetch }] =
        useQueries({
            queries: [
                {
                    queryFn: () => serviceLikes.get(),
                    queryKey: ["likes", `user=${userId}`],
                    enabled: !!userId,
                },
                {
                    queryFn: () => serviceLikes.getTargetId("offer", id),
                    queryKey: ["likes", `provider=offer`, `id=${id}`],
                    enabled: !!id,
                },
            ],
        })

    const isLikes = useMemo(() => {
        if (!userId || !dataLikesMy?.res || !id) return false
        return !!dataLikesMy?.res?.some(
            (item) =>
                Number(item?.id) === Number(id) &&
                Number(item?.userId) === Number(userId) &&
                item.provider === "offer",
        )
    }, [userId, dataLikesMy?.res, id])

    function handle() {
        if (!loading && !!userId) {
            setLoading(true)
            serviceLikes
                .post({
                    id: id!,
                    provider: "offer",
                })
                .then((response) => {
                    setTimeout(() => {
                        Promise.all([refetch(), refetchLikesMy()]).then(
                            (responses) => {
                                console.log(
                                    "%c --refresh responses: ",
                                    `color: blue`,
                                    responses,
                                )
                                setLoading(false)
                            },
                        )
                    }, 1500)
                    if (response?.ok) {
                        console.log(
                            "%c ---post like: ",
                            "color: #0f0",
                            response?.res,
                        )
                    } else {
                        console.log(
                            "%c ---post like: ",
                            "color: #f00",
                            response?.res,
                        )
                    }
                })
        }
    }

    return (
        <div
            className={styles.container}
            onClick={handle}
            data-active={isLikes}
        >
            <Image
                src={loading ? "/svg/loading-03.svg" : "/svg/thumbs-up.svg"}
                alt="thumbs-up"
                width={18}
                height={18}
                data-loading-image={loading}
            />
            <p>{data?.res || 0}</p>
        </div>
    )
}
