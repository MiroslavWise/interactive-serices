"use client"

import { isMobile } from "react-device-detect"

import type { TContent } from "./types/types"

import { DividerVertical } from "@/components/common/Divider"

import { ItemsAdress } from "./components/ItemsAdress"
import { ItemsCategories } from "./components/ItemsCategories"
import { LabelInput, LabelTextArea } from "./components/LabelInput"
import { GroupSelectorDate } from "./components/GroupSelectorDate"

import { useUpdateProfile } from "@/store/hooks"

import styles from "./styles/content.module.scss"

const textAboutAddress = "Вы можете добавить несколько местоположений, но одновременно выбрать можно только одно."
const textAboutOffers = "Выберите услуги, которые вы хотите что-бы вам оказали"

const FirstColumn: TContent = ({ errors, register, watch, setValue }) => {
    return (
        <div className={styles.informationProfileColumn}>
            {isMobile ? (
                <LabelTextArea
                    label="О себе"
                    placeholder="Расскажите чем вы занимаетесь или что вас интересует?(до 256 символов)"
                    type="text"
                    propsInput={register("about", { required: false })}
                    errorMessage={errors.about ? "Это поле не может быть пустым" : ""}
                />
            ) : null}
            <LabelInput
                label="Имя"
                rules
                placeholder="Введите своё имя"
                type="text"
                propsInput={register("firstName", { required: true })}
                errorMessage={errors.firstName ? "Это поле не может быть пустым" : ""}
            />
            <LabelInput
                label="Фамилия"
                rules
                placeholder="Введите своё фамилия"
                type="text"
                propsInput={register("lastName", { required: true })}
                errorMessage={errors.lastName ? "Это поле не может быть пустым" : ""}
            />
            <LabelInput
                label="Ник"
                rules
                placeholder="Введите желаемый ник"
                type="text"
                propsInput={register("username", { required: true })}
                errorMessage={errors.username ? "Это поле не может быть пустым" : ""}
            />
            <GroupSelectorDate
                label="Дата рождения"
                watchDay={watch("day")}
                watchMonth={watch("month")}
                watchYear={watch("year")}
                propsRegister={{
                    day: register("day", { required: false }),
                    month: register("month", { required: false }),
                    year: register("year", { required: false }),
                }}
                set={setValue}
                errorDate={{
                    day: errors.day,
                    month: errors.month,
                    year: errors.year,
                }}
            />
            <LabelInput
                label="Электронная почта"
                rules
                disabled
                placeholder="Введите почту"
                type="email"
                propsInput={register("email", { required: false })}
                errorMessage={errors.email ? "Это поле не может быть пустым" : ""}
            />
        </div>
    )
}

function SecondColumn() {
    const isVisible = useUpdateProfile(({ isVisible }) => isVisible)

    return (
        <div className={styles.adressProfileColumn}>
            <div className={styles.adressTitleAbout}>
                <h5>
                    Адрес <sup style={{ color: "red" }}>*</sup>
                </h5>
                <p>{textAboutAddress}</p>
                <ItemsAdress />
            </div>
            <div className={styles.adressTitleAbout}>
                <h5>
                    Желаемые услуги <sup style={{ color: "red" }}>*</sup>
                </h5>
                <p>{textAboutOffers}</p>
                {isVisible && <ItemsCategories />}
            </div>
        </div>
    )
}

export const Content: TContent = ({ errors, register, watch, setValue }) => {
    return (
        <div className={styles.container}>
            <FirstColumn {...{ errors, register, watch, setValue }} />
            {!isMobile && <DividerVertical />}
            <SecondColumn />
        </div>
    )
}
