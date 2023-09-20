"use client"

import { useId } from "react"
import { isMobile } from "react-device-detect"

import type { TImagesUploadInput } from "./types/types"

import { UploadPhoto } from "@/components/common/custom"

import { cx } from "@/lib/cx"

import styles from "./styles/images-upload.module.scss"

export const ImagesUploadInput: TImagesUploadInput = ({
    files,
    setFile,
    selected,
    setSelectedFile,
}) => {
    const id = useId()

    function deleteFile() {}

    return (
        <div className={cx(styles.container, isMobile && styles.mobile)}>
            <ul>
                {files.map((item, index) => (
                    <UploadPhoto
                        key={`${id}_photo_alert_${index}`}
                        files={item}
                        index={index}
                        selected={selected[index]}
                        setFiles={setFile}
                        setSelectedImage={setSelectedFile}
                        deleteFile={deleteFile}
                    />
                ))}
                {files.length < 9 ? (
                    <UploadPhoto
                        key={`${files.length}_file`}
                        files={files[files.length]}
                        index={files.length}
                        selected={selected[files.length]}
                        setFiles={setFile}
                        setSelectedImage={setSelectedFile}
                        deleteFile={deleteFile}
                    />
                ) : null}
            </ul>
        </div>
    )
}
