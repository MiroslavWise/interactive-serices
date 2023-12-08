"use client"

import type { TContainerTagAndButton } from "./types/types"
import type { TTypeProvider } from "@/services/file-upload/types"

import { useProviderProfileOffer, dispatchProvider } from "@/store/hooks"

import styles from "./styles/style.module.scss"

interface ITabs {
    label: string
    value: TTypeProvider
}

const TABS: ITabs[] = [
    {
        label: "Мои предложения",
        value: "offer",
    },
    {
        label: "Дискуссии",
        value: "discussion",
    },
    // {
    //     label: "SOS",
    //     value: "alert",
    // },
]

export const ContainerTagAndButton: TContainerTagAndButton = ({}) => {
    const stateProvider = useProviderProfileOffer(({ stateProvider }) => stateProvider)

    return (
        <div className={styles.containerTagAndButton}>
            <nav>
                {TABS.map((item) => (
                    <a
                        key={`${item.value}-provider`}
                        onClick={(event) => {
                            event.stopPropagation()
                            dispatchProvider(item.value)
                        }}
                        data-active={stateProvider === item.value}
                    >
                        <span>{item.label}</span>
                    </a>
                ))}
            </nav>
        </div>
    )
}
