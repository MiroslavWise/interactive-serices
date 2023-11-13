"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useMemo, type DispatchWithoutAction, useState } from "react"
import { useSearchParams } from "next/navigation"

import type { TPopupMenu } from "./types/types"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { GeoTagging } from "@/components/common/GeoTagging"
import { NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { serviceBarters } from "@/services/barters"
import { serviceThreads } from "@/services/threads"
import { usePush } from "@/helpers/hooks/usePush"
import { serviceTestimonials } from "@/services/testimonials"
import { useAuth, usePopupMenuChat } from "@/store/hooks"
import { useRefetchListChat } from "../../hook/useRefetchListChat"
import { useMessagesType } from "@/store/state/useMessagesType"
import { MENU_ITEM_POPUP, type TTypeActionMenu } from "../constants"
import { useCompletionTransaction } from "@/store/state/useCompletionTransaction"

import mainStyles from "../styles/style.module.scss"
import styles from "./styles/popup-menu.module.scss"

export const PopupMenu: TPopupMenu = ({ dataUser, isBarter, idBarter }) => {
    const searchParams = useSearchParams()
    const idThread = searchParams?.get("thread")
    const { dispatchCompletion } = useCompletionTransaction()
    const { isVisible, setIsVisible } = usePopupMenuChat()
    const [loading, setLoading] = useState(false)
    const { userId } = useAuth()
    const refresh = useRefetchListChat()
    const { type } = useMessagesType()
    const { handlePush, handleReplace } = usePush()
    const { data, refetch } = useQuery({
        queryFn: () => serviceBarters.getId(idBarter),
        queryKey: ["barters", `id=${idBarter}`],
        enabled: !!idBarter,
    })
    const isMeInitiator = useMemo(() => {
        return userId && data?.res?.initiator?.userId === userId
    }, [data?.res, userId])

    const offerId: number | null = useMemo(() => {
        if (!data?.res || !dataUser?.id!) {
            return null
        }
        if (Number(data?.res?.initiator?.userId) === Number(dataUser?.id!)) {
            return Number(data?.res?.consignedId)
        } else {
            return Number(data?.res?.initialId)
        }
    }, [data?.res, dataUser])

    const { data: dataTestimonials, refetch: refetchTestimonials } = useQuery({
        queryFn: () =>
            serviceTestimonials.get({
                target: offerId!,
                provider: "offer",
                barter: idBarter!,
            }),
        queryKey: ["testimonials", `barter=${idBarter}`, `offer=${offerId!}`],
        enabled:
            ["executed", "destroyed", "completed"]?.includes(
                data?.res?.status!,
            ) && !!offerId,
    })

    const isFeedback = useMemo(() => {
        return dataTestimonials?.res?.some(
            (item) =>
                item?.userId === dataUser?.id && item?.barterId === idBarter,
        )
    }, [dataUser, idBarter, dataTestimonials?.res])

    function handleClickMenu(value: TTypeActionMenu) {
        const handleObject: Record<TTypeActionMenu, DispatchWithoutAction> = {
            onProfile: () => handlePush(`/user?id=${dataUser?.id!}`),
            openBarter: () => {},
            deleteChat: () => {
                handleDeleteChat()
            },
            allRequest: () => {},
            currentExchanges: () => {},
        }
        setIsVisible(false)
        handleObject[value]()
    }

    function handleDeleteChat() {
        serviceThreads
            .patch({ enabled: false }, Number(idThread))
            .then((response) => {
                refresh(type).finally(() => {
                    requestAnimationFrame(() => {
                        handleReplace("/messages")
                    })
                })
            })
    }

    const geo = useMemo(() => {
        if (!dataUser?.addresses) {
            return null
        }
        if (Array.isArray(dataUser?.addresses) && !dataUser?.addresses.length) {
            return null
        }
        return dataUser?.addresses?.find((item) => item?.addressType === "main")
            ?.additional
    }, [dataUser?.addresses])

    return (
        <div
            className={styles.wrapper}
            data-is-barter={isBarter}
            data-visible={isVisible}
        >
            <div
                className={cx(mainStyles.button, styles.dots)}
                onClick={() => setIsVisible()}
            >
                <Image
                    src="/svg/x-close.svg"
                    alt="dots-vertical"
                    width={24}
                    height={24}
                />
            </div>
            {isBarter ? (
                <motion.div
                    data-is-open={isVisible}
                    initial={{ borderRadius: 12 }}
                    data-menu
                >
                    <div data-user>
                        <NextImageMotion
                            src={dataUser?.profile?.image?.attributes?.url!}
                            alt="avatar"
                            width={250}
                            height={250}
                        />
                        <div data-title>
                            <h2 data-title>
                                {dataUser?.profile?.firstName || "--"}{" "}
                                {dataUser?.profile?.lastName || "--"}
                            </h2>
                            {geo ? (
                                <GeoTagging
                                    location={geo}
                                    fontSize={12}
                                    size={16}
                                />
                            ) : null}
                        </div>
                    </div>
                    {MENU_ITEM_POPUP.map((item) => (
                        <li
                            key={item.value}
                            onClick={() => handleClickMenu(item.value)}
                        >
                            <Image
                                src={item.image.url}
                                alt={item.image.alt}
                                width={20}
                                height={20}
                            />
                            <p>{item.label}</p>
                        </li>
                    ))}
                    <li
                        key={`--back--`}
                        onClick={() => {
                            handleReplace("/messages")
                        }}
                    >
                        <Image
                            src="/svg/arrow-left.svg"
                            alt="back"
                            width={20}
                            height={20}
                        />
                        <p>Назад</p>
                    </li>
                </motion.div>
            ) : (
                <motion.ul
                    layout
                    data-is-open={isVisible}
                    className={cx(styles.menu)}
                    initial={{ borderRadius: 12 }}
                >
                    {MENU_ITEM_POPUP.map((item) => (
                        <li
                            key={item.value}
                            onClick={() => handleClickMenu(item.value)}
                        >
                            <Image
                                src={item.image.url}
                                alt={item.image.alt}
                                width={20}
                                height={20}
                            />
                            <p>{item.label}</p>
                        </li>
                    ))}
                </motion.ul>
            )}
        </div>
    )
}
