"use client"

import { useState } from "react"
import { isMobile } from "react-device-detect"

import { ContentTitleCarousel } from "./ContentTitleCarousel"
import { CustomToggle } from "@/components/common/custom"

import type { TContent } from "../types/types"

import styles from "./styles/style.module.scss"

export const Content: TContent = ({
    register,
    setValue,
    watch,
    address,
    errors,
}) => {
    const [active, setActive] = useState(false)

    return (
        <div className={styles.containerContent} data-mobile={isMobile}>
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
                    <p>Он-лайн обмен</p>
                </div>
            </footer>
        </div>
    )
}
