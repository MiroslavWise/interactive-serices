import Image from "next/image"
import { useQueries } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import type { TBlockLikes } from "../types/types"

import { useAuth } from "@/store/hooks"
import { serviceLikes } from "@/services/likes"

import styles from "../styles/likes.module.scss"

export const BlockLikes: TBlockLikes = ({ id }) => {
    const userId = useAuth(({ userId }) => userId)
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [myLike, setMyLike] = useState(false)
    const [{ data: dataLikesMy, refetch: refetchLikesMy }, { data, refetch }] =
        useQueries({
            queries: [
                {
                    queryFn: () => serviceLikes.get(),
                    queryKey: ["likes", `user=${userId}`],
                    enabled: !!userId,
                    refetchOnMount: true,
                },
                {
                    queryFn: () => serviceLikes.getTargetId("offer", id),
                    queryKey: ["likes", `provider=offer`, `id=${id}`],
                    enabled: !!id,
                    refetchOnMount: true,
                },
            ],
        })

    useEffect(() => {
        if (!!data?.res) {
            setCount(data?.res)
        }
    }, [data])

    useEffect(() => {
        const isLike = !!dataLikesMy?.res?.some(
            (item) =>
                Number(item?.id) === Number(id) &&
                Number(item?.userId) === Number(userId) &&
                item.provider === "offer",
        )

        if (isLike) {
            setMyLike(isLike)
        }
    }, [userId, dataLikesMy?.res, id])

    function handle() {
        if (!loading && !!userId) {
            setLoading(true)
            serviceLikes
                .post({
                    id: id!,
                    provider: "offer",
                })
                .then(async (response) => {
                    if (response?.ok) {
                        setCount(response?.res!)
                    }
                    setMyLike((prev) => !prev)
                    setLoading(false)
                })
        }
    }

    return (
        <div className={styles.container} onClick={handle} data-active={myLike}>
            <Image
                src={loading ? "/svg/loading-03.svg" : "/svg/thumbs-up.svg"}
                alt="thumbs-up"
                width={18}
                height={18}
                data-loading-image={loading}
            />
            <p>{count || 0}</p>
        </div>
    )
}
