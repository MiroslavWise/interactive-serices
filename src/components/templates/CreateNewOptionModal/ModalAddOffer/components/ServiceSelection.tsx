"use client"

import { LabelAndInput } from "../../components/LabelAndInput"
import { LabelAndSelectOffersCategories } from "../../components/LabelAndSelectOffersCategories"

import { SelectAndTextarea } from "../../components/SelectAndTextarea"
import { LabelAndSelectAddress } from "../../components/LabelAndSelectAddress"
import { AddressDescription } from "../../components/AddressDescription"

import { useCreateOffer } from "@/store/hooks"

import styles from "./styles/service-selection.module.scss"

export const ServiceSelection = () => {
    const text = useCreateOffer(({ text }) => text)
    const addressInit = useCreateOffer(({ addressInit }) => addressInit)
    const valueCategory = useCreateOffer(({ valueCategory }) => valueCategory)
    const setText = useCreateOffer(({ setText }) => setText)
    const setValueCategory = useCreateOffer(
        ({ setValueCategory }) => setValueCategory,
    )
    const adressId = useCreateOffer(({ adressId }) => adressId)
    const setAddressId = useCreateOffer(({ setAddressId }) => setAddressId)

    return (
        <section className={styles.wrapper}>
            <p>
                В раскрывающемся меню ниже выберите услугу, которую вы готовы
                предложить публично.
            </p>
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
                    value={valueCategory!}
                    setValue={setValueCategory}
                />
                <LabelAndInput
                    title="Добавьте текст, чтобы сделать ваше предложение более привлекательным и желанным."
                    text={text}
                    setText={setText}
                    placeholder="Напишите что-нибудь"
                />
            </SelectAndTextarea>
        </section>
    )
}
