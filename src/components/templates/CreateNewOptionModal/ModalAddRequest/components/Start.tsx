"use client"

import type { IPostOffers } from "@/services/offers/types"

import { FooterButtons } from "../../components/FooterButtons"
import { LabelAndInput } from "../../components/LabelAndInput"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { LabelAndSelectOffersCategories } from "../../components/LabelAndSelectOffersCategories"

import { useAuth } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"
import { transliterateAndReplace } from "@/helpers"
import { useCreateRequest } from "@/store/state/useCreateRequest"

export const Start = () => {
    const { userId, addresses } = useAuth()
    const {
        text,
        setText,
        resetRequest,
        setStepRequest,
        selected,
        setValueCategory,
    } = useCreateRequest()

    function handleExit() {
        resetRequest()
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
        if (addresses?.length) {
            data.addresses = [Number(addresses[0]?.id)]
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
            </SelectAndTextarea>
            <FooterButtons
                disabled={!text || !selected}
                handleNext={handleNext}
                handleExit={handleExit}
            />
        </>
    )
}
