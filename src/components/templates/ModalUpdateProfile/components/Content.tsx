"use client"

import { isMobile } from "react-device-detect"

import type { TContent } from "./types/types"

import { DividerVertical } from "@/components/common/Divider"

import { ItemsAdress } from "./components/ItemsAdress"
import { LabelInput, LabelTextArea } from "./components/LabelInput"
import { GroupSelectorDate } from "./components/GroupSelectorDate"

import styles from "./styles/content.module.scss"

const textAboutAddress =
    "Вы можете добавить несколько местоположений, но одновременно выбрать можно только одно."

export const Content: TContent = ({ errors, register, watch, setValue }) => {
    function FirstColumn() {
        return (
            <>
                {isMobile ? (
                    <LabelTextArea
                        label="О себе"
                        placeholder="Расскажите чем вы занимаетесь или что вас интересует?(до 256 символов)"
                        type="text"
                        propsInput={register("about", { required: false })}
                        errorMessage={
                            errors.about ? "Это поле не может быть пустым" : ""
                        }
                    />
                ) : null}
                <LabelInput
                    label="Имя"
                    rules
                    placeholder="Введите своё имя"
                    type="text"
                    propsInput={register("firstName", { required: true })}
                    errorMessage={
                        errors.firstName ? "Это поле не может быть пустым" : ""
                    }
                />
                <LabelInput
                    label="Фамилия"
                    rules
                    placeholder="Введите своё фамилия"
                    type="text"
                    propsInput={register("lastName", { required: true })}
                    errorMessage={
                        errors.lastName ? "Это поле не может быть пустым" : ""
                    }
                />
                <LabelInput
                    label="Ник"
                    rules
                    placeholder="Введите желаемый ник"
                    type="text"
                    propsInput={register("username", { required: true })}
                    errorMessage={
                        errors.username ? "Это поле не может быть пустым" : ""
                    }
                />
                <GroupSelectorDate
                    label="Дата рождения"
                    watchDay={watch("day")}
                    watchMonth={watch("month")}
                    watchYear={watch("year")}
                    propsRegister={{
                        day: register("day", { required: true }),
                        month: register("month", { required: true }),
                        year: register("year", { required: true }),
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
                    propsInput={register("email", { required: true })}
                    errorMessage={
                        errors.email ? "Это поле не может быть пустым" : ""
                    }
                />
            </>
        )
    }

    function SecondColumn() {
        return (
            <div className={styles.adressProfileColumn}>
                <div className={styles.adressTitleAbout}>
                    <h5>
                        Адрес <sup style={{ color: "red" }}>*</sup>
                    </h5>
                    <p>{textAboutAddress}</p>
                    <ItemsAdress />
                </div>
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className={styles.containerMobile}>
                <FirstColumn />
                <SecondColumn />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.informationProfileColumn}>
                <FirstColumn />
            </div>
            <DividerVertical />
            <SecondColumn />
        </div>
    )
}
