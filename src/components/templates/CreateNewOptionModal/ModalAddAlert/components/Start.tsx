"use client"

import type { IPatchOffers, IPostOffers } from "@/services/offers/types"

import { FooterButtons } from "../../components/FooterButtons"
import { LabelAndInput } from "../../components/LabelAndInput"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { AddressDescription } from "../../components/AddressDescription"
import { ImagesUploadInput } from "../../components/ImagesUploadInput"

import { useCreateAlert } from "@/store/state/useCreateAlert"

import { useAuth } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"
import { fileUploadService } from "@/services/file-upload"
import { serviceAddresses } from "@/services/addresses"
import { transliterateAndReplace, useCloseCreateOptions } from "@/helpers"
import { LabelAndSelectAddress } from "../../components/LabelAndSelectAddress"

export const Start = () => {
    const { userId } = useAuth()
    const { close } = useCloseCreateOptions()
    const {
        text,
        files,
        selectedFile,
        setText,
        setStepAlert,
        setFile,
        setSelectedFile,
        addressInit,
        adressId,
        setAddressId,
    } = useCreateAlert()

    function postOffer(idsAddresses: number[]) {
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
                        Promise.all(
                            files.map((item) =>
                                fileUploadService(item!, {
                                    type: "alert",
                                    userId: userId!,
                                    idSupplements: response?.res?.id!,
                                }),
                            ),
                        ).then((responses) => {
                            const values: IPatchOffers = {}
                            values.images = []
                            responses.forEach((item) => {
                                if (item.ok) {
                                    if (item.res) {
                                        values.images?.push(item?.res?.id!)
                                    }
                                }
                            })
                            serviceOffer
                                .patch(values, response?.res?.id!)
                                .then(() => {
                                    setStepAlert("end")
                                })
                        })
                    } else {
                        setStepAlert("end")
                    }
                }
            } else {
                close()
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
            if (adressId?.id) {
                postOffer([Number(adressId?.id)])
            }
        }
    }

    return (
        <>
            <SelectAndTextarea>
                {addressInit?.additional ? (
                    <AddressDescription address={addressInit?.additional!} />
                ) : (
                    <LabelAndSelectAddress
                        value={adressId?.id ? { id: adressId?.id! } : undefined}
                        setValue={setAddressId}
                    />
                )}
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
                handleExit={close}
            />
        </>
    )
}
