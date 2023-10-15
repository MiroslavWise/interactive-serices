"use client"

import { useForm } from "react-hook-form"

import type { TBlockComments } from "../types/types"

import { ItemComment } from "./ItemComment"
import { ButtonFill } from "@/components/common/Buttons"

export const BlockComments: TBlockComments = () => {
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IValues>({})

    function submit(values: IValues) {}

    const onSubmit = handleSubmit(submit)

    return (
        <article>
            <ul>
                <ItemComment />
                <ItemComment />
                <ItemComment />
                <ItemComment />
                <ItemComment />
            </ul>
            <form onSubmit={onSubmit}>
                <textarea
                    value={watch("text")}
                    placeholder="Напишите свой комментарий"
                    onKeyDown={(event) => {
                        if (event.keyCode === 13 || event.code === "Enter") {
                            onSubmit()
                        }
                    }}
                    {...register("text", { required: true })}
                />
                <ButtonFill
                    type="primary"
                    label="Добавить комментарий"
                    submit="submit"
                />
            </form>
        </article>
    )
}

interface IValues {
    text: string
}
