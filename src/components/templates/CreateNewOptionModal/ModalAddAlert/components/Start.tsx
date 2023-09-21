"use client"

import type { IPostOffers } from "@/services/offers/types"

import { FooterButtons } from "../../components/FooterButtons"
import { LabelAndInput } from "../../components/LabelAndInput"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { ImagesUploadInput } from "../../components/ImagesUploadInput"

import { useCreateAlert } from "@/store/state/useCreateAlert"

import { useAuth } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"
import { fileUploadService } from "@/services/file-upload"
import { transliterateAndReplace, useAddress } from "@/helpers"

export const Start = () => {
    const { userId } = useAuth()
    const { idsAddresses } = useAddress()
    const {
        text,
        files,
        selectedFile,
        setText,
        resetAlert,
        setStepAlert,
        setFile,
        setSelectedFile,
    } = useCreateAlert()

    function handleExit() {
        resetAlert()
    }

    function handleNext() {
        const data: IPostOffers = {
            provider: "alert",
            title: text,
            userId: userId!,
            slug: transliterateAndReplace(text),
            enabled: true,
            desired: true,
        }
        if (idsAddresses) {
            data.addresses = idsAddresses
        }
        serviceOffer.post(data).then((response) => {
            if (response.ok) {
                if (response.res) {
                    if (files.length > 0) {
                        Promise.allSettled(
                            files.map((item) =>
                                fileUploadService(item!, {
                                    type: "alert",
                                    userId: userId!,
                                    idSupplements: response?.res?.id!,
                                }),
                            ),
                        ).then((responses) => {
                            console.log("responses upload files offer: ", {
                                responses,
                            })
                        })
                        setStepAlert("end")
                    } else {
                        setStepAlert("end")
                    }
                }
            }
        })
    }

    return (
        <>
            <SelectAndTextarea>
                <LabelAndInput
                    title="Придумайте заголовок для вашего обсуждения."
                    text={text}
                    setText={setText}
                    placeholder="Что вы хотите обсудить?"
                />
                <ImagesUploadInput
                    {...{
                        files,
                        setFile,
                        selected: selectedFile,
                        setSelectedFile,
                    }}
                />
            </SelectAndTextarea>
            <FooterButtons
                disabled={!text}
                handleNext={handleNext}
                handleExit={handleExit}
            />
        </>
    )
}
