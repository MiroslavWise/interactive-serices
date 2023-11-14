"use client"

import { ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { useDataConfirmationPopUp } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const DataConfirmationPopUp = () => {
    const {
        type,
        nameFeedback,
        visibleDataConfirmation,
        dispatchDataConfirmation,
    } = useDataConfirmationPopUp()

    return (
        <div
            className={cx("wrapper-fixed", styles.wrapper)}
            data-visible={visibleDataConfirmation}
        >
            <section>
                <ButtonClose
                    onClick={() => dispatchDataConfirmation({ visible: false })}
                    position={{ top: 12, right: 12 }}
                />
                <h3>
                    {type === "register"
                        ? "Вы успешно заогиестрировались. Зайдите на свою почту и пройдите верификацию по ссылке, которая вам пришла"
                        : null}
                    {type === "feedback"
                        ? `Ваш отзыв поможет улучшить качество услуг ${nameFeedback}, спасибо :)`
                        : null}
                </h3>
            </section>
        </div>
    )
}
