"use client"

import { type ReactNode, useMemo, useState } from "react"

import type { TActiveCheck } from "./components/types/types"

import { CircleCheck } from "./components/CircleCheck"
import { Divider } from "@/components/common/Divider"
import { AddingPhotos } from "./components/AddingPhotos"
import { ServiceSelection } from "./components/ServiceSelection"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { useCreateOffer } from "@/store/state/useCreateOffer"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"

import styles from "./styles/style.module.scss"

const DESCRIPTIONS = [1, 2, 3]

type TSteps = 1 | 2 | 3

export const ModalAddOffer = () => {
    const { setVisibleAndType } = useAddCreateModal()
    const [step, setStep] = useState<TSteps>(1)
    const { reset } = useCreateOffer()

    const content: ReactNode = useMemo(() => {
        const obj: Record<TSteps, ReactNode> = {
            1: <ServiceSelection />,
            2: <AddingPhotos />,
            3: <></>,
        }

        return obj[step]
    }, [step])

    function handleNext() {
        setStep((prev) => {
            if (prev === 3) return 3
            return (prev + 1) as TSteps
        })
    }

    function typeActive(check: number): TActiveCheck {
        if (check < step) return "finished"
        if (check === 3 && step === 3) return "finished"
        if (step === check) return "in_process"
        return "not_active"
    }

    function handleExit() {
        setVisibleAndType()
        reset()
    }

    return (
        <ul className={styles.container}>
            <section className={styles.steps}>
                <div className={styles.checkBoxes}>
                    <CircleCheck type={typeActive(1)} />
                    <Divider />
                    <CircleCheck type={typeActive(2)} />
                    <Divider />
                    <CircleCheck type={typeActive(3)} />
                </div>
                <div className={styles.description}>
                    {DESCRIPTIONS.map((item) => (
                        <h4 key={`${item}_offer_description`}>Шаг {item}</h4>
                    ))}
                </div>
            </section>
            {content}
            <footer>
                <ButtonDefault
                    label="Отмена"
                    classNames={styles.button}
                    handleClick={handleExit}
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
