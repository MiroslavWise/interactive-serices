"use client"

import { useState } from "react"

import type { IPatchOffers, IPostOffers } from "@/services/offers/types"

import { SubTitle } from "../../components/SubTitle"
import { FooterButtons } from "../../components/FooterButtons"
import { LabelAndInput } from "../../components/LabelAndInput"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { AddressDescription } from "../../components/AddressDescription"
import { ImagesUploadInput } from "../../components/ImagesUploadInput"
import { LabelAndSelectAddress } from "../../components/LabelAndSelectAddress"

import { useAuth } from "@/store/hooks"
import { serviceOffers } from "@/services/offers"
import { serviceAddresses } from "@/services/addresses"
import { fileUploadService } from "@/services/file-upload"
import { useCreateDiscussion } from "@/store/state/useCreateDiscussion"
import {
    replaceRussianMats,
    transliterateAndReplace,
    useCloseCreateOptions,
} from "@/helpers"
import { useRefresh } from "../../hooks/useRefresh"

export const Start = () => {
    const { userId } = useAuth()
    const { close } = useCloseCreateOptions()
    const [loading, setLoading] = useState(false)
    const refresh = useRefresh()
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

    async function postOffer(idsAddresses: number[]) {
        const data: IPostOffers = {
            provider: "discussion",
            title: replaceRussianMats(text),
            userId: userId!,
            slug: transliterateAndReplace(text!),
            enabled: true,
            desired: true,
        }
        if (idsAddresses) {
            data.addresses = idsAddresses
        }
        return serviceOffers.post(data).then((response) => {
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
                            serviceOffers
                                .patch(values, response?.res?.id!)
                                .then(() => {
                                    refresh()
                                    setStepDiscussion("end")
                                })
                        })
                    } else {
                        refresh()
                        setStepDiscussion("end")
                    }
                }
            } else {
                close()
            }
        })
    }
    function handleNext() {
        if (!text) {
            return
        }

        if (!loading) {
            if (addressInit) {
                serviceAddresses.getHash(addressInit.hash!).then((response) => {
                    if (!response?.res?.id) {
                        serviceAddresses.post(addressInit).then((response_) => {
                            if (response_.ok) {
                                if (response_.res) {
                                    postOffer([response_?.res?.id]).finally(
                                        () => {
                                            setLoading(false)
                                        },
                                    )
                                }
                            }
                        })
                    } else {
                        postOffer([response?.res?.id]).finally(() => {
                            setLoading(false)
                        })
                    }
                })
            } else {
                if (adressId?.id) {
                    postOffer([Number(adressId?.id)]).finally(() => {
                        setLoading(false)
                    })
                }
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
                loading={loading}
                handleNext={handleNext}
                handleExit={close}
            />
        </>
    )
}
