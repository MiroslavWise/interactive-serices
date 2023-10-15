import Image from "next/image"

import type { TItemComment } from "../types/types"

import { daysAgo } from "@/helpers"

export const ItemComment: TItemComment = () => {
    return (
        <li>
            <header>
                <div data-avatar-name>
                    <Image
                        src="/png/blur_avatar_default.jpg"
                        alt="avatar"
                        width={400}
                        height={400}
                        unoptimized
                    />
                    <p>Кристина Пи</p>
                </div>
                <p>{daysAgo(new Date())}</p>
            </header>
            <p>Вы совсем кукухой поехали? На газоне нильзя паркаватся!!!!!</p>
        </li>
    )
}
