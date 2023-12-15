"use client"

import { isMobile } from "react-device-detect"

import type { TContainerTagAndButton } from "./types/types"
import type { ISegmentValues } from "@/components/common/Segments/types"
import type { TTypeProvider } from "@/services/file-upload/types"

import { Segments } from "@/components/common/Segments"

import { useProviderProfileOffer, dispatchProvider } from "@/store/hooks"

import styles from "./styles/style.module.scss"

const TABS: ISegmentValues<TTypeProvider>[] = [
    {
        label: isMobile ? "Предложения" : "Мои предложения",
        value: "offer",
    },
    {
        label: "Дискуссии",
        value: "discussion",
    },
    {
        label: "SOS",
        value: "alert",
    },
]

export const ContainerTagAndButton: TContainerTagAndButton = ({}) => {
    const stateProvider = useProviderProfileOffer(({ stateProvider }) => stateProvider)

    return (
        <div className={styles.containerTagAndButton}>
            <Segments
                type="primary"
                VALUES={TABS}
                active={TABS.find((_) => _.value === stateProvider)!}
                setActive={({ value }) => {
                    dispatchProvider(value)
                }}
            />
        </div>
    )
}
