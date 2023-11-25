"use client"

import Image from "next/image"
import { type ChangeEvent } from "react"
import { isMobile } from "react-device-detect"

import type { TUploadPhoto } from "./types"

import { ImageStatic } from "@/components/common/Image"

import styles from "./style.module.scss"

export const UploadPhoto: TUploadPhoto = ({
    index,
    selected,
    setFiles,
    setSelectedImage,
    deleteFile,
}) => {
    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files

        if (file && file?.length > 0) {
            for (let i = 0; i < file.length; i++) {
                if (file[i]) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        setSelectedImage(reader.result as string)
                    }
                    reader.readAsDataURL(file[i])
                    setFiles(file[i])
                }
            }
        }
    }

    function deletePhoto(index: number) {
        deleteFile(index)
    }

    return (
        <div className={styles.container} data-upload data-mobile={isMobile}>
            {selected ? (
                <ImageStatic
                    src={selected}
                    height={900}
                    width={300}
                    alt="offer"
                    classNames={[styles.photo]}
                    onClick={() => deletePhoto(index)}
                />
            ) : (
                <Image
                    src="/svg/plus-gray.svg"
                    alt="plus-gray"
                    height={60}
                    width={60}
                    unoptimized
                />
            )}
            <input
                type="file"
                accept="video/*, image/*"
                onChange={handleImageChange}
                multiple
            />
        </div>
    )
}
