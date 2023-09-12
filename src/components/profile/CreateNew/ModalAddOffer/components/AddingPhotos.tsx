"use client"

import { useState } from "react"

import type { TAddingPhotos } from "./types/types"

import { UploadPhoto } from "@/components/common/custom"

import { useCreateOffer } from "@/store/state/useCreateOffer"

import styles from "./styles/service-selection.module.scss"

export const AddingPhotos: TAddingPhotos = () => {
    const {
        files,
        setFiles,
        selectedFilesString,
        setSelectedFilesString,
        deleteFile,
    } = useCreateOffer()

    return (
        <section className={styles.wrapper}>
            <p>
                Добавьте несколько фотографий и видео, чтобы пользователи могли
                лучше понять, что вы на самом деле предлагаете.
            </p>
            <div className={styles.photos}>
                {files.map((item, index) => (
                    <UploadPhoto
                        key={`${index}_file`}
                        files={files[index]}
                        index={index}
                        selected={selectedFilesString[index]}
                        setFiles={setFiles}
                        setSelectedImage={setSelectedFilesString}
                        deleteFile={deleteFile}
                    />
                ))}
                {files.length < 9 ? (
                    <UploadPhoto
                        key={`${files.length}_file`}
                        files={files[files.length]}
                        index={files.length}
                        selected={selectedFilesString[files.length]}
                        setFiles={setFiles}
                        setSelectedImage={setSelectedFilesString}
                        deleteFile={deleteFile}
                    />
                ) : null}
            </div>
        </section>
    )
}
