"use client"

import { isMobile } from "react-device-detect"

import type { TAddingPhotos } from "./types/types"

import { UploadPhoto } from "@/components/common/custom"

import { cx } from "@/lib/cx"
import { useCreateOffer } from "@/store/state/useCreateOffer"

import styles from "./styles/service-selection.module.scss"

export const AddingPhotos: TAddingPhotos = () => {
    const { files, setFile, selectedFile, setSelectedFile, deleteFile } =
        useCreateOffer((_) => ({
            files: _.files,
            setFile: _.setFile,
            selectedFile: _.selectedFile,
            setSelectedFile: _.setSelectedFile,
            deleteFile: _.deleteFile,
        }))

    return (
        <section className={cx(styles.wrapper, isMobile && styles.mobile)}>
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
                        selected={selectedFile[index]}
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
                        selected={selectedFile[files.length]}
                        setFiles={setFile}
                        setSelectedImage={setSelectedFile}
                        deleteFile={deleteFile}
                    />
                ) : null}
            </div>
        </section>
    )
}
