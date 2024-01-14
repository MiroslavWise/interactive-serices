import { ChangeEvent, Dispatch, SetStateAction, memo } from "react"

import { ImageStatic, NextImageMotion } from "@/components/common"

import styles from "../styles/image-profile.module.scss"

export const ImageProfile = memo(function ImageProfile({
    image,
    file,
    setFile,
}: {
    image: string
    file: { file: File | null; string: string }
    setFile: Dispatch<SetStateAction<{ file: File | null; string: string }>>
}) {
    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        event.stopPropagation()
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFile((prev) => ({
                    ...prev,
                    string: reader.result as string,
                }))
            }
            reader.readAsDataURL(file)
            setFile((prev) => ({ ...prev, file: file }))
        }
    }

    return (
        <div className={styles.container}>
            <div data-img>
                {file.string ? (
                    <ImageStatic src={file.string} alt="avatar" width={80} height={80} />
                ) : image ? (
                    <NextImageMotion src={image} alt="avatar" width={80} height={80} />
                ) : null}
            </div>
            <a>
                <input type="file" onChange={handleImageChange} accept=".jpg, .jpeg, .png, image/*" />
                Изменить
            </a>
            <a data-red>Удалить</a>
        </div>
    )
})
