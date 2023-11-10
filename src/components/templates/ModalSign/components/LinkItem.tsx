"use client"

import Image from "next/image"

import type { TLinkItem } from "../types/types"

import { URL_API } from "@/helpers"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/links-social.module.scss"

export const LinkItem: TLinkItem = ({ src, path, isActive }) => {
    const { handlePush } = usePush()

    return (
        <div
            className={styles.item}
            onClick={() => {
                if (isActive) {
                    handlePush(`${URL_API}${path}`)
                }
            }}
        >
            <Image src={src} alt={src} height={24} width={24} />
        </div>
    )
}
