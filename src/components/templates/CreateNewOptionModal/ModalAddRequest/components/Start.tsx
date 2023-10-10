"use client"

import type { IPatchOffers, IPostOffers } from "@/services/offers/types"

import { SubTitle } from "../../components/SubTitle"
import { FooterButtons } from "../../components/FooterButtons"
import { LabelAndInput } from "../../components/LabelAndInput"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { LabelAndSelectAddress } from "../../components/LabelAndSelectAddress"
import { LabelAndSelectOffersCategories } from "../../components/LabelAndSelectOffersCategories"

import { useAuth } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"
import { useCreateRequest } from "@/store/state/useCreateRequest"
import { AddressDescription } from "../../components/AddressDescription"
import { ImagesUploadInput } from "../../components/ImagesUploadInput"
import { transliterateAndReplace, useCloseCreateOptions } from "@/helpers"
import { fileUploadService } from "@/services/file-upload"
import { serviceAddresses } from "@/services/addresses"

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

    function postOffer(idsAddresses: number[]) {
        const data: IPostOffers = {
            provider: "request",
            title: text,
            userId: userId!,
            categoryId: Number(selected?.id!),
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
                                    setStepRequest("end")
                                })
                        })
                    } else {
                        setStepRequest("end")
                    }
                }
            } else {
                close()
            }
        })
    }

    function handleNext() {
        if (!selected || !text) {
            return
        }

        if (addressInit) {
            // serviceAddresses.getHash(addressInit.hash!).then((response) => {
            // if (!response?.res?.id) {
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
                    title="Предложение"
                    placeholder="Выберите категории"
                    value={selected!}
                    setValue={setValueCategory}
                />
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
                disabled={!text || !selected}
                handleNext={handleNext}
                handleExit={handleExit}
            />
        </>
    )
}
