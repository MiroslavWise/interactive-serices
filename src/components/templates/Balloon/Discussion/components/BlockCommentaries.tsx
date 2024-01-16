import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import type { ICommentsResponse } from "@/services/comments/types"

import { ButtonLike } from "./ButtonLike"

import { serviceComments } from "@/services/comments"
import { useAuth, useBalloonDiscussion } from "@/store/hooks"
import { serviceOffersThreads } from "@/services/offers-threads"

import styles from "../styles/block-commentaries.module.scss"

export const BlockCommentaries = () => {
    const userId = useAuth(({ userId }) => userId)
    const offer = useBalloonDiscussion(({ offer }) => offer)
    const { id } = offer ?? {}
    const [loading, setLoading] = useState(false)
    const [expand, setExpand] = useState(false)
    const [currentComments, setCurrentComments] = useState<
        (ICommentsResponse & {
            isTemporary?: boolean
            temporaryNumber?: number
            isErrorRequest?: boolean
        })[]
    >([])

    const { register, watch, setValue, handleSubmit } = useForm<IValues>({})

    const { data, refetch } = useQuery({
        queryFn: () =>
            serviceOffersThreads.get({
                offer: id!,
            }),
        queryKey: ["offers-threads", id!],
        enabled: !!id!,
    })

    const currentOffersThreads = useMemo(() => {
        return data?.res?.find((item) => item?.offerId === id) || null
    }, [data?.res, id])

    const { data: dataComments, refetch: refetchComments } = useQuery({
        queryFn: () => serviceComments.get({ offer: currentOffersThreads?.id! }),
        queryKey: ["comments", `offer=${currentOffersThreads?.id!}`],
        enabled: !!currentOffersThreads?.id!,
    })

    useEffect(() => {
        if (dataComments?.res && dataComments?.res?.length > 0) {
            if (Array.isArray(dataComments?.res)) {
                setCurrentComments(dataComments?.res)
            }
        }
    }, [dataComments?.res])

    return (
        <div className={styles.container}>
            <div data-header>
                <div data-divider="horizontal" />
                <div data-avatars></div>
                <div data-buttons>
                    <button
                        onClick={(event) => {
                            event.stopPropagation()
                            setExpand((prev) => !prev)
                        }}
                        data-comments
                    >
                        <span>{currentComments?.length} комментариев</span>
                        <div data-img data-is-expand={expand}>
                            <img src="/svg/chevron-down.svg" alt="down" width={18} height={18} />
                        </div>
                    </button>
                    <ButtonLike />
                </div>
            </div>
            {expand ? <div></div> : null}
        </div>
    )
}

interface IValues {
    text: string
}
