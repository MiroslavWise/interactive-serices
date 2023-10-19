"use client"

import { isMobile } from "react-device-detect"

import type { TMyProfilePage } from "./types/types"

import { Badges } from "../BlockProfileAside/components/Badges"
import { ContainerAboutMe } from "./components/ContainerAboutMe"
import { ContainerSuggestions } from "./components/ContainerSuggestions"
import { ContainerTagAndButton } from "./components/ContainerTagAndButton"
import { M_ContainerAboutProfile } from "./components/M_ContainerAboutProfile"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"
import { useState } from "react"

export const MyProfilePage: TMyProfilePage = ({}) => {
    const [isOfferOrRequest, setIsOfferOrRequest] = useState<
        "offer" | "request"
    >("offer")

    return (
        <ul
            className={cx(
                styles.containerProfilePage,
                isMobile && styles.mobile,
            )}
            
        >
            {typeof isMobile !== "undefined" && !isMobile ? (
                <ContainerAboutMe
                    {...{ isOfferOrRequest, setIsOfferOrRequest }}
                />
            ) : null}
            {isMobile ? <M_ContainerAboutProfile /> : null}
            {isMobile ? <Badges /> : null}
            <ContainerTagAndButton
                {...{ isOfferOrRequest, setIsOfferOrRequest }}
            />
            <ContainerSuggestions
                {...{ isOfferOrRequest, setIsOfferOrRequest }}
            />
        </ul>
    )
}
