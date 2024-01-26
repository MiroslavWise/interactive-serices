"use client"

import { useForm } from "react-hook-form"

import type { IValuesForm } from "./types/types"

import { ButtonClose, Button } from "@/components/common"

import { cx } from "@/lib/cx"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchComplaintModal, useComplaintModal } from "@/store"

import styles from "./styles/style.module.scss"

export const ComplaintModal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        watch,
        reset,
    } = useForm<IValuesForm>({})
    const { on } = useToast()
    const user = useComplaintModal(({ user }) => user)
    const visibleComplaint = useComplaintModal(({ visibleComplaint }) => visibleComplaint)

    function handleClose() {
        dispatchComplaintModal({ visible: false, user: undefined })
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

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visibleComplaint}>
            <section data-section-modal>
                <ButtonClose onClick={handleClose} position={{}} />
                <header>
                    <h3>
                        Жалоба на <span>@{user?.profile?.username}</span>
                    </h3>
                </header>
                <form onSubmit={onSubmit}>
                    <p>
                        Мы в Sheira уделяем много внимания качеству сервиса и контента. Наши специалисты оперативно примут меры для устранения любых найденных
                        нарушений. Пожалуйста, опишите подробно суть вашей жалобы. Мы сообщим вам о нашем решении в течение 48 часов.
                    </p>
                    <div data-text-area data-error={!!errors?.comment}>
                        <textarea
                            {...register("comment", { required: true, maxLength: 1024 })}
                            onKeyDown={(event) => {
                                if (event.keyCode === 13 || event.code === "Enter") {
                                    onSubmit()
                                }
                            }}
                            maxLength={1024}
                            placeholder={"Опишите причину вашей жалобы"}
                        />
                        <sup data-more={watch("comment")?.length > 920}>
                            <span>{watch("comment")?.length || 0}</span>/1024
                        </sup>
                    </div>
                    <Button type="submit" typeButton="regular-primary" label="Пожаловаться" disabled={!watch("comment")} />
                </form>
            </section>
        </div>
    )
}
