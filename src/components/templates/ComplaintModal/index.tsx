"use client"

import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"

import type { IValuesForm } from "./types/types"

import styles from "./styles/style.module.scss"
import { ButtonClose, ButtonDefault } from "@/components/common/Buttons"
import { useComplaintModal } from "@/store/state/useComplaintModal"
import { TextArea } from "@/components/common/Inputs/components/TextArea"
import { useToast } from "@/helpers/hooks/useToast"

export const ComplaintModal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm<IValuesForm>({})
    const { visibleComplaint, user, dispatchComplaintModal } =
        useComplaintModal()
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
        <div
            className={styles.wrapper}
            data-visible={visibleComplaint}
            data-mobile={isMobile}
        >
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
                <h5>
                    Данная жалоба будет проверена модераторами, и если будут
                    найдены нарушения, пользователь получить бан!
                </h5>
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
                    onChange={(event) =>
                        setValue("comment", event.target.value!)
                    }
                    maxLength={512}
                    placeholder={"Опишите причину вашей жалобы"}
                />
                <ButtonDefault label="Пожаловаться" submit="submit" />
            </form>
        </div>
    ) : null
}
