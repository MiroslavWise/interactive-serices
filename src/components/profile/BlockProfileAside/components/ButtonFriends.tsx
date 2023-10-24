"use client"

import Image from "next/image"

import { useDroverFriends } from "@/store/state/useDroverFriends"

export const ButtonFriends = () => {
    const { dispatchFriends } = useDroverFriends()

    function handleOpen() {
        dispatchFriends({ visible: true })
    }

    return (
        <div data-friends onClick={handleOpen}>
            <p>Всего 132 друга</p>
            <Image
                src="/svg/arrow-right.svg"
                alt="arrow-right"
                width={24}
                height={24}
            />
        </div>
    )
}
