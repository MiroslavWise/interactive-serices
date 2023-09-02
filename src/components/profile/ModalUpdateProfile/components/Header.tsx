"use client"

import Image from "next/image"
import { type ChangeEvent } from "react"

import type { THeader } from "./types/types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { useAuth } from "@/store/hooks"

import styles from "./styles/header.module.scss"

export const Header: THeader = ({
    selectedImage,
    setFile,
    setSelectedImage,
}) => {
    const { imageProfile } = useAuth()

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedImage(reader.result as string)
            }
            reader.readAsDataURL(file)
            setFile(file)
        }
    }

    function handleImageReset() {
        setSelectedImage(null)
    }

    return (
        <header className={styles.container}>
            <div className={styles.photoContainer}>
                {selectedImage ? (
                    <ImageStatic
                        src={selectedImage}
                        alt="avatar"
                        width={400}
                        height={400}
                        classNames={[styles.avatar]}
                    />
                ) : imageProfile ? (
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
                )}
                <input
                    type="file"
                    className={styles.inputUploadFile}
                    accept=".jpg, .jpeg, .png, image/*"
                    onChange={handleImageChange}
                    id="imageInput"
                />
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
