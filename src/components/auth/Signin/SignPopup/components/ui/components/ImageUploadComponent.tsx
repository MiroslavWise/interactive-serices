import Image from "next/image"
import { type ChangeEvent } from "react"

import type { TImageUploadComponent } from "./types/types"

import { NextImageMotion } from "@/components/common/Image"
import { ButtonDefault, ButtonsCircle } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ImageUploadComponent: TImageUploadComponent = ({
    selectedImage,
    setSelectedImage,
    setFile,
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
        <div className={styles.imageUploader}>
            <div
                className={cx(
                    styles.imageContainer,
                    (selectedImage || imageProfile?.id) && styles.imageActive,
                )}
            >
                {selectedImage || imageProfile ? (
                    <>
                        {imageProfile ? (
                            <NextImageMotion
                                className={styles.img}
                                src={imageProfile?.attributes?.url}
                                alt="avatar"
                                width={300}
                                height={300}
                            />
                        ) : (
                            <Image
                                className={styles.img}
                                src={selectedImage!}
                                alt="upload"
                                width={300}
                                height={300}
                            />
                        )}
                        <div className={styles.buttonsContainerImage}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                id="imageInput"
                                className={styles.inputFile}
                            />
                            <label
                                htmlFor="imageInput"
                                className={styles.button}
                            >
                                <ButtonsCircle
                                    src="/svg/download.svg"
                                    type="primary"
                                />
                            </label>
                            <ButtonDefault
                                type="primary"
                                label="Удалить"
                                handleClick={handleImageReset}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            id="imageInput"
                            className={styles.inputFile}
                        />
                        <label
                            htmlFor="imageInput"
                            className={styles.uploadButton}
                        >
                            <p>Загрузить изображение</p>
                        </label>
                    </>
                )}
            </div>
        </div>
    )
}
