"use client"

import type { IPostOffers } from "@/services/offers/types"

import { FooterButtons } from "../../components/FooterButtons"
import { LabelAndInput } from "../../components/LabelAndInput"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { ImagesUploadInput } from "../../components/ImagesUploadInput"

import { useAuth } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"
import { transliterateAndReplace } from "@/helpers"
import { fileUploadService } from "@/services/file-upload"
import { useCreateDiscussion } from "@/store/state/useCreateDiscussion"

export const Start = () => {
    const { userId, addresses } = useAuth()
    const {
        text,
        files,
        selectedFile,
        setFile,
        setText,
        setSelectedFile,
        resetDiscussion,
        setStepDiscussion,
    } = useCreateDiscussion()

    function handleExit() {
        resetDiscussion()
    }

    function handleNext() {
        const data: IPostOffers = {
            provider: "discussion",
            title: text,
            userId: userId!,
            slug: transliterateAndReplace(text!),
            enabled: true,
            desired: true,
        }
        if (addresses?.length) {
            data.addresses = [Number(addresses[0]?.id)]
        }
        serviceOffer.post(data).then((response) => {
            if (response.ok) {
                if (response.res) {
                    if (files.length > 0) {
                        Promise.allSettled(
                            files.map((item) =>
                                fileUploadService(item!, {
                                    type: "discussion",
                                    userId: userId!,
                                    idSupplements: response?.res?.id!,
                                }),
                            ),
                        ).then((responses) => {
                            console.log("responses upload files offer: ", {
                                responses,
                            })
                        })
                        setStepDiscussion("end")
                    } else {
                        setStepDiscussion("end")
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
