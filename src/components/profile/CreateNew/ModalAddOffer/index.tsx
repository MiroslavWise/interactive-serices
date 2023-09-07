"use client"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { useAddCreateModal } from "@/store/state/useAddCreateModal"

import styles from "./styles/style.module.scss"

export const ModalAddOffer = () => {
    const { setVisibleAndType } = useAddCreateModal()

    function handleNext() {}

    return (
        <ul className={styles.container}>
            <section>
                <header></header>
            </section>
            <footer>
                <ButtonDefault
                    label="Отмена"
                    classNames={styles.button}
                    handleClick={setVisibleAndType}
                />
                <ButtonFill
                    label="Следующий"
                    type="primary"
                    classNames={styles.button}
                    handleClick={handleNext}
                />
            </footer>
        </ul>
    )
}
