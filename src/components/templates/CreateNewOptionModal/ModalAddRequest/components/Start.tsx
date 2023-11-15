"use client"

import { useState } from "react"

import type { IPatchOffers, IPostOffers } from "@/services/offers/types"

import { SubTitle } from "../../components/SubTitle"
import { FooterButtons } from "../../components/FooterButtons"
import { LabelAndInput } from "../../components/LabelAndInput"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { LabelAndSelectAddress } from "../../components/LabelAndSelectAddress"
import { LabelAndSelectOffersCategories } from "../../components/LabelAndSelectOffersCategories"

import { useAuth } from "@/store/hooks"
import { serviceOffers } from "@/services/offers"
import { useCreateRequest } from "@/store/state/useCreateRequest"
import { AddressDescription } from "../../components/AddressDescription"
import { ImagesUploadInput } from "../../components/ImagesUploadInput"
import {
    replaceRussianMats,
    transliterateAndReplace,
    useCloseCreateOptions,
} from "@/helpers"
import { fileUploadService } from "@/services/file-upload"
import { serviceAddresses } from "@/services/addresses"
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
        setStepRequest,
        selected,
        setValueCategory,
        addressInit,
        adressId,
        setAddressId,
    } = useCreateRequest()

    function handleExit() {
        close()
    }

    async function postOffer(idsAddresses: number[]) {
        if (text && selected?.id && (addressInit || adressId)) {
            const data: IPostOffers = {
                provider: "request",
                title: replaceRussianMats(text),
                categoryId: Number(selected?.id!),
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
                                        setStepRequest("end")
                                    })
                            })
                        } else {
                            refresh()
                            setStepRequest("end")
                        }
                    }
                } else {
                    close()
                }
            })
        }
    }

    function handleNext() {
        if (!selected || !text) {
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
                Выберите услугу, которую хотите получить, в раскрывающемся меню
                ниже.
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
                <LabelAndSelectOffersCategories
                    title="Я хочу"
                    placeholder="Выберите категории"
                    value={selected!}
                    setValue={setValueCategory}
                />
                <LabelAndInput
                    title="Добавьте текст, чтобы люди могли понять что вы хотите"
                    text={text}
                    setText={setText}
                    placeholder="Опишите более подробно, в чём конкретно ваша просьба"
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
                disabled={!text || !selected}
                handleNext={handleNext}
                handleExit={handleExit}
            />
        </>
    )
}
