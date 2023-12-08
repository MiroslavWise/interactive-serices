"use client"

import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { TTextAreaSend } from "./types/types"
import type { IRequestPostMessages } from "@/services/messages/types"

import { FilesUpload } from "./FilesUpload"
import { Button } from "@/components/common"
import { TextArea } from "@/components/common/Inputs/components/TextArea"
import { ButtonCircleGradientFill } from "@/components/common/Buttons/ButtonCircleGradientFill"

import { useAuth } from "@/store/hooks"
import { serviceMessages } from "@/services/messages"
import { fileUploadService } from "@/services/file-upload"
import { useWebSocket } from "@/context/WebSocketProvider"

import styles from "./styles/text-area.module.scss"

export const TextAreaSend: TTextAreaSend = ({ idUser, refetch, setStateMessages }) => {
    const idThread = useSearchParams()?.get("thread")
    const { socket } = useWebSocket()
    const userId = useAuth(({ userId }) => userId)
    const { register, setValue, handleSubmit, watch } = useForm<{
        text: string
    }>({})
    const [loading, setLoading] = useState(false)

    const [files, setFiles] = useState<File[]>([])
    const [strings, setStrings] = useState<string[]>([])

    function deleteFile(index: number) {
        setFiles((prev) => prev.filter((_, i) => i !== index))
        setStrings((prev) => prev.filter((_, i) => i !== index))
    }

    function addFile(value: File) {
        setFiles((prev) => [...prev, value])
    }
    function addString(value: string) {
        setStrings((prev) => [...prev, value])
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files

        if (file && file?.length > 0) {
            for (let i = 0; i < file.length; i++) {
                if (file[i]) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        setStrings((prev) => [...prev, reader.result as string])
                    }
                    reader.readAsDataURL(file[i])
                    setFiles((prev) => [...prev, file[i]])
                }
            }
        }
    }

    async function submit({ text }: { text: string }) {
        if (!loading) {
            setLoading(true)
            const date = new Date()
            const message = text
            const receiverIds = [Number(idUser)]
            if (message || files.length) {
                setStateMessages((prev) => [
                    ...prev,
                    {
                        id: Math.random(),
                        message: message || "",
                        parentId: null,
                        threadId: Number(idThread!),
                        emitterId: Number(userId),
                        receiverIds: receiverIds,
                        temporary: true,
                        created: date,
                        images: [...strings],
                    },
                ])

                Promise.all(
                    files.map((item) =>
                        fileUploadService(item, {
                            type: "threads",
                            userId: userId!,
                            idSupplements: Number(idThread),
                        }),
                    ),
                ).then((responses) => {
                    let array: number[] = []

                    responses.forEach((item) => {
                        if (item.res?.id) {
                            array.push(item.res?.id!)
                        }
                    })

                    if (socket?.connected) {
                        console.log("socket?.connected: ", socket?.connected)
                        socket?.emit(
                            "chat",
                            {
                                receiverIds: receiverIds,
                                message: message || "",
                                threadId: Number(idThread!),
                                created: date,
                                parentId: undefined,
                                images: [...array],
                            },
                            (response: any) => {
                                console.log("message response :", response)
                            },
                        )
                        requestAnimationFrame(() => {
                            setValue("text", "")
                            setFiles([])
                            setStrings([])
                        })
                        setTimeout(() => {
                            setLoading(false)
                        }, 150)
                    } else {
                        const data: IRequestPostMessages = {
                            threadId: Number(idThread!),
                            message: message || "",
                            emitterId: Number(userId),
                            receiverIds: receiverIds,
                            enabled: true,
                            created: date,
                        }
                        serviceMessages.post(data).then((response) => {
                            requestAnimationFrame(() => {
                                refetch()
                            })
                            setValue("text", "")
                            setLoading(false)
                        })
                    }
                })
            }
        }
    }

    const onSubmit = handleSubmit(submit)

    return (
        <form onSubmit={onSubmit} className={styles.container}>
            {isMobile ? (
                <div className={styles.paperclip}>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/png, image/gif, image/jpeg, image/*, .png, .jpg, .jpeg"
                        multiple
                    />
                    <Image src="/svg/paperclip-gray.svg" alt="paperclip-gray" width={16.5} height={16.5} unoptimized />
                </div>
            ) : null}
            {isMobile ? (
                <input
                    value={watch("text")}
                    placeholder="Введите сообщение..."
                    {...register("text", { required: files.length ? false : true })}
                    maxLength={512}
                />
            ) : (
                <TextArea
                    placeholder="Введите сообщение..."
                    onKeyDown={(event) => {
                        if (event.keyCode === 13 || event.code === "Enter") {
                            onSubmit()
                        }
                    }}
                    {...register("text", { required: files.length ? false : true })}
                    maxLength={512}
                />
            )}
            {isMobile ? (
                <ButtonCircleGradientFill
                    submit="submit"
                    type="option-1"
                    image={{
                        src: "/svg/send-white.svg",
                        size: 24,
                    }}
                    onClick={() => {}}
                    size={48}
                />
            ) : null}
            <div className={styles.buttons}>
                {!isMobile ? (
                    <div data-files-input>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/png, image/gif, image/jpeg, image/*, .png, .jpg, .jpeg"
                            multiple
                        />
                        <Image src="/svg/paperclip-gray.svg" alt="paperclip" width={20} height={20} unoptimized />
                    </div>
                ) : null}
                {!isMobile ? (
                    <Button
                        type="submit"
                        label="Отправить"
                        typeButton="fill-orange"
                        suffixIcon={<Image src="/svg/send-white.svg" alt="send" width={24} height={24} unoptimized />}
                    />
                ) : null}
            </div>
            <FilesUpload {...{ files, strings, addFile, addString, deleteFile }} />
        </form>
    )
}
