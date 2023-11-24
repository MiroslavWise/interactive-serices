"use client"

import { type ReactNode, useMemo, useState } from "react"

import type { TActiveCheck } from "./components/types/types"
import type { IPatchOffers, IPostOffers } from "@/services/offers/types"

import { CircleCheck } from "./components/CircleCheck"
import { FinishScreen } from "../components/FinishScreen"
import { Divider } from "@/components/common/Divider"
import { AddingPhotos } from "./components/AddingPhotos"
import { ServiceSelection } from "./components/ServiceSelection"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { serviceOffers } from "@/services/offers"
import { Button } from "@/components/common"
import { useCreateOffer } from "@/store/state/useCreateOffer"

import { useAuth } from "@/store/hooks"
import { fileUploadService } from "@/services/file-upload"
import {
    replaceRussianMats,
    transliterateAndReplace,
    useCloseCreateOptions,
} from "@/helpers"
import { useRefresh } from "../hooks/useRefresh"
import { serviceAddresses } from "@/services/addresses"

import styles from "./styles/style.module.scss"

const DESCRIPTIONS = [1, 2, 3]

type TSteps = 1 | 2 | 3

export const ModalAddOffer = () => {
    const { userId } = useAuth()
    const { close } = useCloseCreateOptions()
    const [step, setStep] = useState<TSteps>(1)
    const refresh = useRefresh()
    const { files, setId, id, text, valueCategory, adressId, addressInit } =
        useCreateOffer()

    const content: ReactNode = useMemo(() => {
        const obj: Record<TSteps, ReactNode> = {
            1: <ServiceSelection />,
            2: <AddingPhotos />,
            3: <FinishScreen />,
        }

        return obj[step]
    }, [step])

    function next() {
        setStep((prev) => {
            if (prev === 3) return 3
            return (prev + 1) as TSteps
        })
    }

    function postData(data: IPostOffers) {
        serviceOffers.post(data).then((response) => {
            if (response.ok) {
                if (response?.res?.id!) {
                    setId(Number(response?.res?.id!))
                }
                next()
            } else {
                close()
            }
        })
    }

    function handleNext() {
        if (step === 1 && valueCategory?.id && (adressId || addressInit)) {
            const data: IPostOffers = {
                provider: `offer`,
                title: replaceRussianMats(text!),
                categoryId: valueCategory?.id,
                slug: transliterateAndReplace(text),
                enabled: true,
                desired: true,
            }
            if (addressInit) {
                serviceAddresses.getHash(addressInit.hash!).then((response) => {
                    if (!response?.res?.id) {
                        serviceAddresses
                            .post(addressInit!)
                            .then((response_) => {
                                if (response_.ok) {
                                    if (response_.res) {
                                        data.addresses = [
                                            Number(response_?.res?.id),
                                        ]
                                        postData(data)
                                    }
                                }
                            })
                    } else {
                        data.addresses = [Number(response?.res?.id)]
                        postData(data)
                    }
                })
            } else {
                if (adressId?.id) {
                    data.addresses = [Number(adressId?.id)]
                    postData(data)
                }
            }
            return
        }
        if (step === 2 && id) {
            const data: IPatchOffers = {}
            data.images = []
            Promise.all(
                files.map((file) =>
                    fileUploadService(file!, {
                        type: "offer",
                        userId: userId!,
                        idSupplements: id!,
                    }),
                ),
            ).then((responses) => {
                console.log("responses: ", responses)
                responses.forEach((item) => {
                    if (item.ok) {
                        if (item.res) {
                            data.images?.push(item?.res?.id)
                        }
                    }
                })
                serviceOffers.patch(data, id!).then(() => {
                    refresh()
                    next()
                })
            })
            return
        }
    }

    function typeActive(check: number): TActiveCheck {
        if (check < step) return "finished"
        if (check === 3 && step === 3) return "finished"
        if (step === check) return "in_process"
        return "not_active"
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
                    <Button
                        label="Отмена"
                        type="button"
                        typeButton="regular-primary"
                        className={styles.button}
                        onClick={close}
                    />
                    <Button
                        label="Далее"
                        type="button"
                        typeButton="fill-primary"
                        className={styles.button}
                        onClick={handleNext}
                    />
                </footer>
            ) : null}
        </ul>
    )
}
