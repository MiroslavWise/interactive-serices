"use client"

import { useForm } from "react-hook-form"

import type { IValuesForm } from "./types/types"

import { ButtonClose, Button } from "@/components/common"
import { TextArea } from "@/components/common/Inputs/components/TextArea"

import { cx } from "@/lib/cx"
import { useToast } from "@/helpers/hooks/useToast"
import { useComplaintModal } from "@/store/state/useComplaintModal"

import styles from "./styles/style.module.scss"

export const ComplaintModal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm<IValuesForm>({})
    const { visibleComplaint, user, dispatchComplaintModal } = useComplaintModal()
    const { on } = useToast()

    function handleClose() {
        dispatchComplaintModal({ visible: false })
    }

    function submit(values: IValuesForm) {
        on(
            {
                message: `Ваша жалоба на пользователя @${user?.profile?.username} отправлена`,
            },
            "error",
        )
        requestAnimationFrame(() => {
            reset()
            handleClose()
        })
    }

    const onSubmit = handleSubmit(submit)

    return visibleComplaint ? (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visibleComplaint}>
            <form onSubmit={onSubmit}>
                <ButtonClose
                    onClick={handleClose}
                    position={{
                        top: 12,
                        right: 12,
                    }}
                />
                <h2>
                    Оставить жалобу на <span>@{user?.profile?.username}</span>
                </h2>
                <h5>Данная жалоба будет проверена модераторами, и если будут найдены нарушения, пользователь получить бан!</h5>
                <TextArea
                    {...register("comment", {
                        required: true,
                        minLength: 5,
                    })}
                    data-error={errors.comment}
                    value={watch("comment")}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13 || event.code === "Enter") {
                            onSubmit()
                        }
                    }}
                    onChange={(event) => setValue("comment", event.target.value!)}
                    maxLength={1024}
                    placeholder={"Опишите причину вашей жалобы"}
                />
                <Button type="submit" typeButton="regular-primary" label="Пожаловаться" />
            </form>
        </div>
    ) : null
}
