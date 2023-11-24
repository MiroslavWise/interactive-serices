"use client"

import { isMobile } from "react-device-detect"

import { Content } from "./content/content"
import { ButtonClose } from "@/components/common/Buttons"
import { GlassesBanner } from "@/components/common/Glasses"

import { useModalAuth } from "@/store/hooks"

export function ModalSign() {
    const { type, visible, dispatchAuthModal } = useModalAuth((state) => ({
        type: state.type,
        visible: state.visible,
        dispatchAuthModal: state.dispatchAuthModal,
    }))

    const buttonClose = (
        <ButtonClose
            onClick={() =>
                dispatchAuthModal({
                    visible: false,
                    type: type,
                })
            }
            position={{
                right: 12,
                top: 12,
            }}
        />
    )

    return (
        <div
            className={`wrapper-fixed ${
                isMobile ? "authOverviewMobile" : "authOverlay"
            }`}
            data-visible={visible}
        >
            {isMobile ? (
                <>
                    {buttonClose}
                    <div data-content>
                        <Content />
                    </div>
                    <GlassesBanner />
                </>
            ) : (
                <div data-content>
                    {buttonClose}
                    <Content />
                    <GlassesBanner />
                </div>
            )}
        </div>
    )
}
