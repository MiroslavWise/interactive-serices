"use client"

import Image from "next/image"
import { useQuery } from "react-query"
import { useForm } from "react-hook-form"
import { useEffect, useMemo, useRef, useState } from "react"

import type { TBlockComments } from "../types/types"

import { ItemComment } from "./ItemComment"
import { ButtonFill } from "@/components/common/Buttons"
import { TextArea } from "@/components/common/Inputs/components/TextArea"

import { useAuth } from "@/store/hooks"
import { replaceRussianMats } from "@/helpers"
import { serviceComments } from "@/services/comments"
import { serviceOffersThreads } from "@/services/offers-threads"
import { BlockLikes } from "./BlockLikes"

export const BlockComments: TBlockComments = ({ type, offerId }) => {
    const { userId } = useAuth()
    const ulRef = useRef<HTMLUListElement>(null)
    const [activeListComments, setActiveListComments] = useState(false)
    const [offerThreadId, setOfferThreadId] = useState<number | null>(null)
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IValues>({})

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
            serviceComments.get({ target: currentOffersThreads?.id! }),
        queryKey: ["comments", `target=${currentOffersThreads?.id!}`],
        enabled: !!currentOffersThreads?.id!,
    })

    const currentComments = useMemo(() => {
        return (
            dataComments?.res?.filter(
                (item) => item.offerThreadId === currentOffersThreads?.id,
            ) || []
        )
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
                    setTimeout(() => {
                        refetch().finally(() => {
                            setActiveListComments(true)
                        })
                    }, 1000)
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
        if (!userId) return
        serviceComments
            .post({
                userId: userId!,
                offerThreadId: currentOffersThreads?.id! || offerThreadId!,
                message: replaceRussianMats(values?.text),
                status: "published",
                enabled: true,
            })
            .then((response) => {
                refetchComments()
                setValue("text", "")
            })
    }

    const onSubmit = handleSubmit(submit)

    return (
        <>
            {/* {type === "alert" ? (
                <footer data-alert>
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
                </footer>
            ) : null} */}
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
                                value={watch("text")}
                                placeholder="Напишите свой комментарий"
                                onKeyDown={(event) => {
                                    if (
                                        event.keyCode === 13 ||
                                        event.code === "Enter"
                                    ) {
                                        onSubmit()
                                    }
                                }}
                                {...register("text", {
                                    required: true,
                                    maxLength: 240,
                                })}
                                maxLength={240}
                            />
                            <ButtonFill
                                type="primary"
                                label="Добавить комментарий"
                                submit="submit"
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
