"use client"

import type { TLinkItem } from "../types/types"

import { URL_API } from "@/helpers"
import { usePush } from "@/helpers/hooks/usePush"

export const LinkItem: TLinkItem = ({ src, path, isActive }) => {
    const { handlePush } = usePush()

    return (
        <div
            className="__social_item__"
            onClick={() => {
                if (isActive) {
                    handlePush(`${URL_API}${path}`)
                }
            }}
        >
            <div style={{ backgroundImage: `url(${src})` }} data-img />
            {/* <Image src={src} alt={src} height={24} width={24} /> */}
        </div>
    )
}
