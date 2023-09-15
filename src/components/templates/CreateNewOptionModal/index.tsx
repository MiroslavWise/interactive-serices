"use client"

import { isMobile } from "react-device-detect"
import { useEffect, useMemo, type ReactNode } from "react"

import type { TAddCreate } from "@/store/types/useAddCreateModal"

import { Header } from "./components/Header"
import { ModalAddAlert } from "./ModalAddAlert"
import { ModalAddOffer } from "./ModalAddOffer"
import { ModalAddRequest } from "./ModalAddRequest"
import { Glasses } from "@/components/common/Glasses"
import { ModalAddDiscussion } from "./ModalAddDiscussion"
import { ButtonClose } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { useCreateOffer } from "@/store/state/useCreateOffer"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"

import styles from "./styles/style.module.scss"

export const CreateNewOptionModal = () => {
    const { isVisible, setVisibleAndType, typeAdd } = useAddCreateModal()
    const { reset } = useCreateOffer()

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

    function handleClose() {
        setVisibleAndType()
        if (typeAdd === "offer") {
            reset()
        }
    }

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
                    onClick={handleClose}
                />
                <Header />
                {content}
                <Glasses />
            </div>
        </div>
    )
}
