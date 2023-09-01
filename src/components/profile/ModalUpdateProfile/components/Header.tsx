"use client"

import Image from "next/image"

import type { THeader } from "./types/types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { useAuth } from "@/store/hooks"

import styles from "./styles/header.module.scss"

export const Header: THeader = ({
    selectedImage, setFile, setSelectedImage
}) => {
    const { imageProfile } = useAuth()

    return (
        <header className={styles.container}>
            <div className={styles.photoContainer}>
                {
                    imageProfile ? (
                        <NextImageMotion
                            src={imageProfile?.attributes?.url!}
                            alt="avatar"
                            width={400}
                            height={400}
                            className={styles.avatar}
                        />
                    ) : (
                        <ImageStatic
                            src="/png/default_avatar.png"
                            alt="avatar"
                            width={400}
                                height={400}
                                classNames={[styles.avatar]}
                        />
                    )
                }
                <div className={styles.iconPlus}>
                    <Image
                        src="/svg/image-plus.svg"
                        alt="image-plus"
                        height={18}
                        width={18}
                    />
                </div>
            </div>
        </header>
    )
}