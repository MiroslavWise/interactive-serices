"use client"

import { Content } from "./content/content"
import { ButtonClose } from "@/components/common"

import { dispatchAuthModal, useModalAuth } from "@/store/hooks"

export function ModalSign() {
    const visible = useModalAuth(({ visible }) => visible)

    return (
        <div className={"wrapper-fixed wrapper-auth"} data-visible={visible}>
            <section>
                <ButtonClose
                    onClick={() =>
                        dispatchAuthModal({
                            visible: false,
                        })
                    }
                    position={{
                        right: 12,
                        top: 12,
                    }}
                />
                <Content />
            </section>
        </div>
    )
}
