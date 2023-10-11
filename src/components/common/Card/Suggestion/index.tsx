"use client"

import { isMobile } from "react-device-detect"

import type { TCardSuggestion } from "./types"

import { MotionLI } from "@/components/common/Motion"
import { Header } from "./components/Header"
import { ContainerPhotos } from "./components/ContainerPhotos"
import { Buttons } from "./components/Buttons"

import styles from "./style.module.scss"

export const CardSuggestion: TCardSuggestion = (props) => {
    const {
        rating,
        images,
        profile,
        categoryId,
        title,
        id,
        refetch,
        provider,
    } = props

    return (
        <MotionLI classNames={[styles.container, isMobile && styles.mobile]}>
            <Header categoryId={categoryId!} rating={rating} title={title} provider={provider} />
            {images?.length ? (
                <ContainerPhotos
                    {...{
                        photos: images.map((item) => ({
                            url: item?.attributes?.url,
                            id: item?.id,
                        })),
                    }}
                />
            ) : null}
            <Buttons id={id} refetch={refetch} provider={provider} />
        </MotionLI>
    )
}
