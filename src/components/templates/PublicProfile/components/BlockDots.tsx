"use client"

import Image from "next/image"

import type { TDots } from "../types/types"

import { usePush } from "@/helpers/hooks/usePush"

export const BlockDots: TDots = ({ id }) => {
    const { handlePush } = usePush()

    return (
        <div data-block-dots>
            <Image
                src="/svg/maximize.svg"
                alt="max"
                width={28}
                height={28}
                onClick={() => {
                    if (id) {
                        handlePush(`/user?id=${id}`)
                    }
                }}
            />
            <Image
                src="/svg/dots-vertical-gray.svg"
                alt="max"
                width={28}
                height={28}
            />
        </div>
    )
}
