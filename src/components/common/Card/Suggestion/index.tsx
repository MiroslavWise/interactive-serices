"use client"

import { isMobile } from "react-device-detect"

import type { TCardSuggestion } from "./types"

import { MotionLI } from "@/components/common/Motion"
import { Header } from "./components/Header"
import { ContainerPhotos } from "./components/ContainerPhotos"
import { Buttons } from "./components/Buttons"

import styles from "./style.module.scss"

export const CardSuggestion: TCardSuggestion = ({
    name,
    can,
    rating,
    photos,
}) => {
    return (
        <MotionLI classNames={[styles.container, isMobile && styles.mobile]}>
            <Header {...{ name, can, rating }} />
            <ContainerPhotos {...{ photos }} />
            <Buttons />
        </MotionLI>
    )
}
