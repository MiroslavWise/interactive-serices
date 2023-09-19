"use client"

import { type ReactNode, useMemo, useState } from "react"

import type { TActiveCheck } from "./components/types/types"

import { CircleCheck } from "./components/CircleCheck"
import { FinishScreen } from "../components/FinishScreen"
import { Divider } from "@/components/common/Divider"
import { AddingPhotos } from "./components/AddingPhotos"
import { ServiceSelection } from "./components/ServiceSelection"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { serviceOffer } from "@/services/offers"
import { useCreateOffer } from "@/store/state/useCreateOffer"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"

import styles from "./styles/style.module.scss"
import { IPatchOffers, IPostOffers } from "@/services/offers/types"
import { useAuth } from "@/store/hooks"
import { fileUploadService } from "@/services/file-upload"
import { transliterateAndReplace } from "@/helpers"

const DESCRIPTIONS = [1, 2, 3]

type TSteps = 1 | 2 | 3

export const ModalAddOffer = () => {
    const { userId } = useAuth()
    const { setVisibleAndType } = useAddCreateModal()
    const [step, setStep] = useState<TSteps>(1)
    const { reset, files, setId, id, text, valueCategory } = useCreateOffer()

    const content: ReactNode = useMemo(() => {
        const obj: Record<TSteps, ReactNode> = {
            1: <ServiceSelection />,
            2: <AddingPhotos />,
            3: <FinishScreen />,
        }

        return obj[step]
    }, [step])

    function handleNext() {
        function next() {
            setStep((prev) => {
                if (prev === 3) return 3
                return (prev + 1) as TSteps
            })
        }
        if (step === 1) {
            const data: IPostOffers = {
                provider: `offer`,
                title: text!,
                categoryId: valueCategory?.id,
                slug: transliterateAndReplace(text),
                enabled: true,
                userId: userId!,
                desired: true,
            }
            serviceOffer.post(data).then((response) => {
                if (response.ok) {
                    if (response?.res?.id!) {
                        setId(Number(response?.res?.id!))
                    }
                }
            })
            next()
        }
        if (step === 2) {
            Promise.allSettled(
                files.map((item) =>
                    fileUploadService(item!, {
                        type: "offer",
                        userId: userId!,
                        profileId: id!,
                    }),
                ),
            ).then((responses) => {
                console.log("responses upload files offer: ", { responses })
            })
            const data: IPatchOffers = {}
            serviceOffer
                .patch(data, id!)
                .then((response) => {
                    console.log("response data patch offer: ", response)
                })
                .finally(() => {
                    next()
                })
        }
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
            {step !== 3 ? (
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
            ) : null}
        </ul>
    )
}
