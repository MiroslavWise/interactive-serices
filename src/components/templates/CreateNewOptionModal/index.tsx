"use client"

import { isMobile } from "react-device-detect"
import { useMemo, type ReactNode, type DispatchWithoutAction } from "react"

import type { TAddCreate } from "@/store/types/useAddCreateModal"

import { Header } from "./components/Header"
import { ModalAddAlert } from "./ModalAddAlert"
import { ModalAddOffer } from "./ModalAddOffer"
import { ModalAddRequest } from "./ModalAddRequest"
import { Glasses } from "@/components/common/Glasses"
import { ModalAddDiscussion } from "./ModalAddDiscussion"
import { ButtonClose } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"
import { useCloseCreateOptions } from "@/helpers/hooks/useCloseCreateOptions"

import styles from "./styles/style.module.scss"

export const CreateNewOptionModal = () => {
    const { close } = useCloseCreateOptions()
    const { isVisible, typeAdd } = useAddCreateModal()

    const content: ReactNode | null = useMemo(() => {
        if (!typeAdd) return null

        const obj: Record<TAddCreate, ReactNode> = {
            offer: <ModalAddOffer />,
            request: <ModalAddRequest />,
            alert: <ModalAddAlert />,
            discussion: <ModalAddDiscussion />,
        }

        return obj[typeAdd]
    }, [typeAdd])

    return (
        <div
            className={cx(
                styles.wrapper,
                isMobile && styles.mobile,
                isVisible && styles.visible,
            )}
        >
            <div className={cx(styles.container)}>
                <ButtonClose
                    position={{
                        right: 12,
                        top: 12,
                    }}
                    onClick={close}
                />
                <Header />
                {content}
                <Glasses />
            </div>
        </div>
    )
}
