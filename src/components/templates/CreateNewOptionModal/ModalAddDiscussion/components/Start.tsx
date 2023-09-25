"use client"

import type { IPostOffers } from "@/services/offers/types"

import { FooterButtons } from "../../components/FooterButtons"
import { LabelAndInput } from "../../components/LabelAndInput"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { ImagesUploadInput } from "../../components/ImagesUploadInput"

import { useAuth } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"
import { fileUploadService } from "@/services/file-upload"
import {
    transliterateAndReplace,
    useAddress,
    useCloseCreateOptions,
} from "@/helpers"
import { useCreateDiscussion } from "@/store/state/useCreateDiscussion"
import { AddressDescription } from "../../components/AddressDescription"
import { serviceAddresses } from "@/services/addresses"

export const Start = () => {
    const { userId } = useAuth()
    const { idsAddresses } = useAddress()
    const { close } = useCloseCreateOptions()
    const {
        text,
        files,
        selectedFile,
        setFile,
        setText,
        setSelectedFile,
        setStepDiscussion,
        addressInit,
    } = useCreateDiscussion()

    function handleExit() {
        close()
    }

    function postOffer(idsAddresses: number[]) { 
        const data: IPostOffers = {
            provider: "discussion",
            title: text,
            userId: userId!,
            slug: transliterateAndReplace(text!),
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
    function handleNext() {
        if (addressInit) {
            serviceAddresses.post(addressInit).then((response) => {
                if (response.ok) {
                    if (response.res) {
                        postOffer([response?.res?.id])
                    }
                }
            })
        } else {
            if (idsAddresses) {
                postOffer(idsAddresses!)
            }
        }
    }

    return (
        <>
            <SelectAndTextarea>
                {addressInit?.additional ? (
                    <AddressDescription address={addressInit?.additional!} />
                ) : null}
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
