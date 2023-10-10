"use client"

import { isMobile } from "react-device-detect"

import type { TCardSuggestion } from "./types"

import { MotionLI } from "@/components/common/Motion"
import { Header } from "./components/Header"
import { ContainerPhotos } from "./components/ContainerPhotos"
import { Buttons } from "./components/Buttons"

import styles from "./style.module.scss"

export const CardSuggestion: TCardSuggestion = ({
    rating,
    images,
    profile,
    categoryId,
    title,
}) => {
    return (
        <MotionLI classNames={[styles.container, isMobile && styles.mobile]}>
            <Header categoryId={categoryId!} rating={rating} title={title} />
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
            <Buttons />
        </MotionLI>
    )
}
