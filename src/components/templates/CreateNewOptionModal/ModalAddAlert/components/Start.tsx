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

import { useCreateAlert } from "@/store/state/useCreateAlert"

import { useAuth } from "@/store/hooks"
import { serviceOffers } from "@/services/offers"
import { fileUploadService } from "@/services/file-upload"
import { serviceAddresses } from "@/services/addresses"
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
        setText,
        setStepAlert,
        setFile,
        setSelectedFile,
        addressInit,
        adressId,
        setAddressId,
    } = useCreateAlert()

    async function postOffer(idsAddresses: number[]) {
        const data: IPostOffers = {
            provider: "alert",
            title: replaceRussianMats(text),
            slug: transliterateAndReplace(text),
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
                            serviceOffers
                                .patch(values, response?.res?.id!)
                                .then(() => {
                                    refresh()
                                    setStepAlert("end")
                                })
                        })
                    } else {
                        refresh()
                        setStepAlert("end")
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
            setLoading(true)
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
                Видите, что что-то произошло, или вам нужна помощь? Просто дайте
                знать остальным
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
                    title="Что у вас случилось?"
                    text={text}
                    setText={setText}
                    placeholder="У меня проблема / Хочу предупредить"
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
                loading={loading}
                disabled={!text}
                handleNext={handleNext}
                handleExit={close}
            />
        </>
    )
}
