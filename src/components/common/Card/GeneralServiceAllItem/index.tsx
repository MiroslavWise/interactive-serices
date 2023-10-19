"use client"

import { useMemo } from "react"

import type { TGeneralServiceAllItem } from "./types"
import type { TTypeProvider } from "@/services/file-upload/types"

import { MotionLI } from "@/components/common/Motion"
import { ImageStatic } from "@/components/common/Image"

import { usePush } from "@/helpers"
import { useBalloonCard } from "@/store/state/useBalloonCard"
import { useMapCoordinates } from "@/store/state/useMapCoordinates"
import { useOffersCategories } from "@/store/state/useOffersCategories"

import styles from "./style.module.scss"
import { useAuth } from "@/store/hooks"

export const GeneralServiceAllItem: TGeneralServiceAllItem = (props) => {
    const {
        id,
        parentId,
        categoryId,
        provider,
        title,
        slug,
        description,
        content,
        imageId,
        featuredId,
        bannerId,
        userId,
        addresses,
        className,
    } = props ?? {}
    const { userId: myUserId } = useAuth()
    const { handlePush } = usePush()
    const { categories } = useOffersCategories()
    const { dispatch } = useBalloonCard()
    const { dispatchMapCoordinates } = useMapCoordinates()

    const typeImagePng: string | null = useMemo(() => {
        const obj: Readonly<Partial<Record<TTypeProvider, any>>> = {
            offer: "/map/circle-offers-default.png",
            discussion: "/map/circle-discussion.png",
            alert: "/map/circle-alert.png",
            request: "/map/circle-offers-default.png",
        }

        return obj[provider] || null
    }, [provider])

    const categoryOffer: string | null = useMemo(() => {
        if (
            ["request", "offer"].includes(provider) &&
            categoryId &&
            categories.length
        ) {
            return categories.find(
                (item) => Number(item.id) === Number(categoryId),
            )?.title!
        }

        return null
    }, [provider, categoryId, categories])

    //

    function handle() {
        const [address, ...rest] = addresses
        dispatch({
            visible: true,
            id: id,
            idUser: userId,
            type: provider || null,
        })
        dispatchMapCoordinates({
            coordinates: address?.coordinates
                ?.split(" ")
                ?.reverse()
                ?.map(Number),
        })
        handlePush("/")
    }

    function handleHelp() {
        if (!myUserId || myUserId === userId) {
            return
        }
        handlePush(`/messages?user=${userId}`)
    }

    return (
        <MotionLI classNames={[styles.container, className]}>
            <header>
                {typeImagePng ? (
                    <ImageStatic
                        src={typeImagePng}
                        alt="offer"
                        width={58}
                        height={58}
                        classNames={[styles.typeImage]}
                        onClick={handle}
                    />
                ) : (
                    <div className={styles.typeImage} />
                )}
                {categoryOffer && <h3>{categoryOffer}</h3>}
                {provider === "alert" && userId !== myUserId && myUserId ? (
                    <button
                        data-help
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            handleHelp()
                        }}
                    >
                        <span>Могу помочь!</span>
                    </button>
                ) : null}
            </header>
            <section>{title && <h4>{title}</h4>}</section>
        </MotionLI>
    )
}
