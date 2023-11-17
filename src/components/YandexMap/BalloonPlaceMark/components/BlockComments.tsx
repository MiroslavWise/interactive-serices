"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useRef, useState } from "react"

import type { TBlockComments } from "../types/types"

import { BlockLikes } from "./BlockLikes"
import { ItemComment } from "./ItemComment"
import { Button } from "@/components/common"
import { TextArea } from "@/components/common/Inputs/components/TextArea"

import { useAuth } from "@/store/hooks"
import { serviceComments } from "@/services/comments"
import { serviceOffersThreads } from "@/services/offers-threads"
import { ICommentsResponse } from "@/services/comments/types"

export const BlockComments: TBlockComments = ({ type, offerId }) => {
    const { userId } = useAuth()
    const [loading, setLoading] = useState(false)
    const ulRef = useRef<HTMLUListElement>(null)
    const [activeListComments, setActiveListComments] = useState(false)
    const [offerThreadId, setOfferThreadId] = useState<number | null>(null)
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
                offer: offerId,
            }),
        queryKey: ["offers-threads", offerId!],
        enabled: !!offerId!,
    })

    const currentOffersThreads = useMemo(() => {
        return data?.res?.find((item) => item?.offerId === offerId) || null
    }, [data?.res, offerId])

    const { data: dataComments, refetch: refetchComments } = useQuery({
        queryFn: () =>
            serviceComments.get({ offer: currentOffersThreads?.id! }),
        queryKey: ["comments", `offer=${currentOffersThreads?.id!}`],
        enabled: !!currentOffersThreads?.id!,
    })

    useEffect(() => {
        if (!!dataComments?.res && !!currentOffersThreads) {
            setCurrentComments(
                dataComments?.res?.filter(
                    (item) => item.offerThreadId === currentOffersThreads?.id,
                ) || [],
            )
        }
    }, [dataComments, currentOffersThreads])

    function handleOnOpen() {
        if (!userId && data?.res?.length) {
            setActiveListComments(true)
            return
        }
        if (Array.isArray(data?.res) && !currentOffersThreads) {
            serviceOffersThreads
                .post({
                    offerId: offerId!,
                    enabled: true,
                })
                .then((response) => {
                    setOfferThreadId(response?.res?.id!)
                    requestAnimationFrame(() => {
                        refetch().finally(() => {
                            setActiveListComments(true)
                        })
                    })
                })
        }
        if (data?.res?.length && currentOffersThreads) {
            setActiveListComments(true)
        }
    }

    useEffect(() => {
        requestAnimationFrame(() => {
            if (currentComments?.length) {
                if (ulRef.current) {
                    const top = ulRef.current.scrollHeight
                    ulRef.current.scroll({ top: top, behavior: "smooth" })
                }
            }
        })
    }, [currentComments, activeListComments])

    function submit(values: IValues) {
        console.log("submit: ", values)
        if (!userId) return
        if (!loading) {
            if (values.text.trim().length >= 3) {
                setLoading(true)
                const temporaryNumber = Math.random()
                setCurrentComments((prev) => [
                    ...prev,
                    {
                        id: temporaryNumber,
                        parentId: null,
                        userId: userId!,
                        offerThreadId:
                            currentOffersThreads?.id! || offerThreadId!,
                        message: values?.text,
                        status: "create",
                        enabled: true,
                        created: new Date(),
                        isTemporary: true,
                        temporaryNumber: temporaryNumber,
                    },
                ])
                serviceComments
                    .post({
                        userId: userId!,
                        offerThreadId:
                            currentOffersThreads?.id! || offerThreadId!,
                        message: values?.text,
                        status: "published",
                        enabled: true,
                    })
                    .then((response) => {
                        if (!response?.ok) {
                            setCurrentComments((prev) =>
                                prev.map((item) => {
                                    if (
                                        item?.temporaryNumber ===
                                            temporaryNumber &&
                                        item?.temporaryNumber !== undefined
                                    ) {
                                        return {
                                            ...item,
                                            isTemporary: false,
                                            isErrorRequest: true,
                                        }
                                    }
                                    return item
                                }),
                            )
                        }
                        setLoading(false)
                        refetchComments()
                        setValue("text", "")
                    })
            }
        }
    }

    const onSubmit = handleSubmit(submit)

    return (
        <>
            {["discussion", "alert"].includes(type) ? (
                <footer data-discussion>
                    <button
                        onClick={() => {
                            activeListComments
                                ? setActiveListComments(false)
                                : handleOnOpen()
                        }}
                    >
                        <span>{currentComments?.length || 0} комментариев</span>
                        <Image
                            src="/svg/chevron-down.svg"
                            alt="chevron-down"
                            width={18}
                            height={18}
                        />
                    </button>
                    <BlockLikes id={offerId!} />
                </footer>
            ) : null}
            {activeListComments ? (
                <article data-auth={!!userId}>
                    <ul ref={ulRef}>
                        {currentComments?.map((item) => (
                            <ItemComment key={`${item.id}-comment`} {...item} />
                        ))}
                    </ul>
                    {userId ? (
                        <form onSubmit={onSubmit}>
                            <TextArea
                                disabled={!userId}
                                {...register("text", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 240,
                                })}
                                value={watch("text")}
                                onChange={(event) =>
                                    setValue("text", event.target.value)
                                }
                                placeholder="Напишите свой комментарий (мин. 3 символа)"
                                onKeyDown={(event) => {
                                    if (
                                        event.keyCode === 13 ||
                                        event.code === "Enter"
                                    ) {
                                        onSubmit()
                                    }
                                }}
                                maxLength={240}
                            />
                            <Button
                                type="submit"
                                label="Добавить комментарий"
                                typeButton="fill-primary"
                            />
                        </form>
                    ) : null}
                </article>
            ) : null}
        </>
    )
}

interface IValues {
    text: string
}
