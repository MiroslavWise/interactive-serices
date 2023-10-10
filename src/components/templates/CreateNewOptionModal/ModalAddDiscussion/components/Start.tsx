"use client"

import type { IPatchOffers, IPostOffers } from "@/services/offers/types"

import { SubTitle } from "../../components/SubTitle"
import { FooterButtons } from "../../components/FooterButtons"
import { LabelAndInput } from "../../components/LabelAndInput"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { AddressDescription } from "../../components/AddressDescription"
import { ImagesUploadInput } from "../../components/ImagesUploadInput"
import { LabelAndSelectAddress } from "../../components/LabelAndSelectAddress"

import { useAuth } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"
import { serviceAddresses } from "@/services/addresses"
import { fileUploadService } from "@/services/file-upload"
import { useCreateDiscussion } from "@/store/state/useCreateDiscussion"
import { transliterateAndReplace, useCloseCreateOptions } from "@/helpers"

export const Start = () => {
    const { userId } = useAuth()
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
        adressId,
        setAddressId,
    } = useCreateDiscussion()

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
                        Promise.all(
                            files.map((item) =>
                                fileUploadService(item!, {
                                    type: "discussion",
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
                                    setStepDiscussion("end")
                                })
                        })
                    } else {
                        setStepDiscussion("end")
                    }
                }
            } else {
                close()
            }
        })
    }
    function handleNext() {
        if (addressInit) {
            // serviceAddresses.getHash(addressInit.hash!).then((response) => {
            //     if (!response?.res?.id) {
            serviceAddresses.post(addressInit).then((response_) => {
                if (response_.ok) {
                    if (response_.res) {
                        postOffer([response_?.res?.id])
                    }
                }
            })
            //     } else {
            //         postOffer([response?.res?.id])
            //     }
            // })
        } else {
            if (adressId?.id) {
                postOffer([Number(adressId?.id)])
            }
        }
    }

    return (
        <>
            <SubTitle>
                Хотите что-то обсудить с другими пользователями Sheira? Создайте
                тему и будьте готовы участвовать в обсуждении!
            </SubTitle>
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
                <p>Вы можете добавить фото, если хотите</p>
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
