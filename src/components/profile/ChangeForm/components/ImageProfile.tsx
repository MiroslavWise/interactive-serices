import { useQuery } from "@tanstack/react-query"
import { ChangeEvent, Dispatch, SetStateAction, memo, useState } from "react"

import type { IPatchProfileData } from "@/services/profile/types/profileService"

import { ImageStatic, NextImageMotion } from "@/components/common"

import { useAuth } from "@/store"
import { serviceProfile } from "@/services"

import styles from "../styles/image-profile.module.scss"
import { flushSync } from "react-dom"

export const ImageProfile = memo(function ImageProfile({
    image,
    file,
    setFile,
    idProfile,
}: {
    image: string
    file: { file: File | null; string: string }
    setFile: Dispatch<SetStateAction<{ file: File | null; string: string }>>
    idProfile: number
}) {
    const [loading, setLoading] = useState(false)
    const userId = useAuth(({ userId }) => userId)
    const { refetch } = useQuery({
        queryFn: () => serviceProfile.getUserId(userId!),
        queryKey: ["profile", userId!],
        enabled: false,
    })

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

    async function handleDelete() {
        if (!loading) {
            if (!!image) {
                const dataPatch: IPatchProfileData = {
                    imageId: null,
                }
                await serviceProfile.patch(dataPatch, idProfile).then(() => {
                    refetch().then(() => {
                        setLoading(false)
                    })
                })
            }
            if (!!file.string) {
                setFile({
                    file: null,
                    string: "",
                })
                flushSync(() => {
                    setLoading(false)
                })
            }

            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div data-img={!!file.string || !!image}>
                {file.string ? (
                    <ImageStatic src={file.string} alt="avatar" width={80} height={80} />
                ) : image ? (
                    <NextImageMotion src={image} alt="avatar" width={80} height={80} />
                ) : (
                    <img src="/svg/profile-null.svg" alt="avatar" height={48} width={48} />
                )}
                {!!file.string || !!image ? (
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation()
                            handleDelete()
                        }}
                        disabled={loading}
                    >
                        <img src="/svg/x-close.svg" alt="x" width={16} height={16} />
                    </button>
                ) : null}
            </div>
            <a>
                <input type="file" onChange={handleImageChange} accept=".jpg, .jpeg, .png, image/*" />
                Изменить
            </a>
        </div>
    )
})
