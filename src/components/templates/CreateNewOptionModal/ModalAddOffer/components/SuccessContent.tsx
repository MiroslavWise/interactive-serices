import Image from "next/image"

import { ButtonFill } from "@/components/common/Buttons"

import { useCreateOffer } from "@/store/state/useCreateOffer"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"

import styles from "./styles/success.module.scss"

const textSuccess =
    "Поздравляем! Скоро мы добавим ваше предложение на карту Шейры. Ваше предложение увидят сотни людей — просто будьте готовы ответить."

export const SuccessContent = () => {
    const { setVisibleAndType } = useAddCreateModal()
    const { reset } = useCreateOffer()

    function handleOk() {
        setVisibleAndType()
        reset()
    }

    return (
        <div className={styles.wrapper}>
            <section>
                <Image
                    src="/svg/success-create.svg"
                    alt="success-create"
                    height={120}
                    width={120}
                />
                <h3>{textSuccess}</h3>
            </section>
            <ButtonFill
                type="primary"
                label="Хорошо"
                handleClick={handleOk}
                classNames={styles.button}
            />
        </div>
    )
}
