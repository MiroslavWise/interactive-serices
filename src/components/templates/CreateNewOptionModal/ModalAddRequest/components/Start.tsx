"use client"

import type { IPostOffers } from "@/services/offers/types"

import { FooterButtons } from "../../components/FooterButtons"
import { LabelAndInput } from "../../components/LabelAndInput"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { LabelAndSelectOffersCategories } from "../../components/LabelAndSelectOffersCategories"

import { transliterateAndReplace, useCloseCreateOptions } from "@/helpers"
import { useAuth } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"
import { useCreateRequest } from "@/store/state/useCreateRequest"
import { LabelAndSelectAddress } from "../../components/LabelAndSelectAddress"

export const Start = () => {
    const { userId, addresses } = useAuth()
    const { close } = useCloseCreateOptions()
    const {
        text,
        setText,
        setStepRequest,
        selected,
        setValueCategory,
        adressId,
        setAddressId,
    } = useCreateRequest()

    function handleExit() {
        close()
    }

    function handleNext() {
        if (!selected || !text) {
            return
        }
        const data: IPostOffers = {
            provider: "request",
            title: text,
            userId: userId!,
            categoryId: Number(selected?.id!),
            slug: transliterateAndReplace(text!),
            enabled: true,
            desired: true,
        }
        if (adressId?.id) {
            data.addresses = [Number(adressId?.id)]
        }
        serviceOffer.post(data).then((response) => {
            console.log("data request: ", { response })
            setStepRequest("end")
        })
    }

    return (
        <>
            <SelectAndTextarea>
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
                <LabelAndSelectAddress
                    value={adressId?.id ? { id: adressId?.id! } : undefined}
                    setValue={setAddressId}
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
