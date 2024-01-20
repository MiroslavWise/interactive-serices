"use client"

import { Content } from "./content/content"
import { ButtonClose } from "@/components/common"

import { dispatchAuthModal, useModalAuth } from "@/store/hooks"

export function ModalSign() {
    const visible = useModalAuth(({ visible }) => visible)

    return (
        <div className={"wrapper-fixed wrapper-auth"} data-visible={visible}>
            <section data-section-modal>
                <ButtonClose onClick={() => dispatchAuthModal({ visible: false })} position={{}} />
                <Content />
            </section>
        </div>
    )
}
