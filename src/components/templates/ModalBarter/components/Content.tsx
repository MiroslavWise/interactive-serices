"use client"

import { useState } from "react"

import { ContentTitleCarousel } from "./ContentTitleCarousel"
import { CustomToggle } from "@/components/common/custom"

import type { TContent } from "../types/types"

import styles from "./styles/style.module.scss"

export const Content: TContent = ({ register, setValue, watch, address, errors }) => {
    const [active, setActive] = useState(false)

    return (
        <main className={styles.containerContent}>
            <ContentTitleCarousel
                register={register}
                setValue={setValue}
                watch={watch}
                address={address}
                errors={errors}
            />
            <footer>
                <div className={styles.toggleLabel}>
                    <CustomToggle isActive={active} setIsActive={setActive} />
                    <p>Он-лайн бартер</p>
                </div>
            </footer>
        </main>
    )
}
