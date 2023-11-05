"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { isMobile } from "react-device-detect"

import type { TComponentsNotification } from "./types/types"

import {
    ButtonCircleGradient,
    ButtonDefault,
} from "@/components/common/Buttons"
import { MotionLI } from "@/components/common/Motion"

import styles from "./styles/style.module.scss"

export const ComponentsNotification: TComponentsNotification = (props) => {
    const { data, created } = props ?? {}

    const { name, entity } = data ?? {}

    const { provider } = entity ?? {}

    return (
        <MotionLI
            classNames={[styles.container]}
            data={{
                "data-provider": data?.entity?.provider,
                "data-name": data?.name,
                "data-mobile": isMobile,
            }}
        >
            <div data-block-info>
                <h3>
                    {name === "Barter" ? <span>Начат обмен: </span> : null}
                    {name === "Offer" && provider === "offer" ? (
                        <span>Вы создали предложение: </span>
                    ) : null}
                    {name === "Offer" && provider === "request" ? (
                        <span>Вы создали запрос: </span>
                    ) : null}
                    {name === "Offer" && provider === "alert" ? (
                        <span>Вы создали оповещение: </span>
                    ) : null}
                    {name === "Offer" && provider === "discussion" ? (
                        <span>Вы создали дискуссию: </span>
                    ) : null}
                    {data?.entity?.title}
                </h3>
                {isMobile ? (
                    <div data-footer>
                        <div data-date>
                            <Image
                                src="/svg/calendar.svg"
                                alt="calendar"
                                width={16}
                                height={16}
                            />
                            <p>{dayjs(created!).format("DD/MM/YYYY")}</p>
                        </div>
                        <div data-buttons>
                            <ButtonDefault label="Посмотреть" />
                            <ButtonCircleGradient
                                type="primary"
                                icon="/svg/x-close-primary.svg"
                            />
                        </div>
                    </div>
                ) : (
                    <div data-date>
                        <Image
                            src="/svg/calendar.svg"
                            alt="calendar"
                            width={16}
                            height={16}
                        />
                        <p>{dayjs(created!).format("DD/MM/YYYY")}</p>
                    </div>
                )}
            </div>
            {!isMobile && (
                <div data-buttons>
                    <ButtonDefault label="Посмотреть" />
                    <ButtonCircleGradient
                        type="primary"
                        icon="/svg/x-close-primary.svg"
                    />
                </div>
            )}
        </MotionLI>
    )
}
