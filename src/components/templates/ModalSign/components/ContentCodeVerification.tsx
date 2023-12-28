"use client"

import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import type { TContentCodeVerification } from "../types/types"

import { Button } from "@/components/common"

import { dispatchAuthModal, useModalAuth, useTimerModalAuth } from "@/store/hooks"

import styles from "../styles/form.module.scss"

const INITIAL_TIME = 120

export const ContentCodeVerification: TContentCodeVerification = ({}) => {
    const [loading, setLoading] = useState(false)
    const phone = useModalAuth(({ phone }) => phone)
    const email = useModalAuth(({ email }) => email)
    const time = useTimerModalAuth(({ time }) => time)

    const [timerObject, setTimerObject] = useState({
        timer: INITIAL_TIME,
        sec: 0,
        minute: Math.floor(INITIAL_TIME / 60),
    })

    useEffect(() => {
        if (time) {
            const interval = setInterval(() => {
                const seconds = INITIAL_TIME - Math.round(dayjs().valueOf() / 1000 - dayjs(time).valueOf() / 1000)
                if (seconds > 0) {
                    const minutes = Math.floor(seconds / 60)
                    const second = Math.floor(seconds - minutes * 60)
                    setTimerObject({
                        timer: seconds,
                        sec: second,
                        minute: minutes,
                    })
                } else {
                    setTimerObject({
                        timer: 0,
                        sec: 0,
                        minute: 0,
                    })
                }
            }, 1000)

            const deleteInterval = setTimeout(() => {
                clearInterval(interval)
            }, (INITIAL_TIME + 7) * 1000)

            return () => {
                clearTimeout(deleteInterval)
                if (interval) {
                    clearInterval(interval)
                }
            }
        }
    }, [time])

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IValues>({
        defaultValues: {
            code: "",
        },
    })

    function handleChange() {
        dispatchAuthModal({
            visible: true,
            type: "SignUp",
        })
    }

    function handleConfirmation() {
        if (!loading) {
            setLoading(true)
        }
    }

    return (
        <div className={styles.content}>
            <article data-column>
                <p>Отправили проверочный код на {!!email ? "почту" : !!phone ? "номер" : null}</p>
                <b>{phone ? phone : email ? email : null}</b>
            </article>
            <form onSubmit={handleSubmit(handleConfirmation)}>
                <section className={styles.section}>
                    <div data-label-input>
                        <label htmlFor="email">Код из {!!email ? "письма" : !!phone ? "СМС" : null}</label>
                    </div>
                    <Controller
                        name="code"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <input
                                data-error={!!errors.code}
                                placeholder={`Введите код из ${!!email ? "письма" : !!phone ? "СМС-сообщения" : ""}`}
                                type="number"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                {...field}
                            />
                        )}
                    />
                    <article data-column>
                        {timerObject.timer ? (
                            <>
                                <p>Запросить новый код можно через</p>
                                <b>
                                    {timerObject.minute}:{timerObject.sec < 10 ? `0${timerObject.sec}` : timerObject.sec}
                                </b>
                            </>
                        ) : (
                            <a>Запросить новый код</a>
                        )}
                    </article>
                </section>
                <footer data-buttons>
                    <Button
                        type="button"
                        typeButton="regular-primary"
                        label={`Изменить ${!!email ? "адрес" : !!phone ? "номер" : null}`}
                        onClick={handleChange}
                        loading={loading}
                        disabled={loading}
                    />
                    <Button type="submit" typeButton="fill-primary" label="Подтвердить" loading={loading} disabled={loading} />
                </footer>
            </form>
        </div>
    )
}

interface IValues {
    code: string
}
