import dayjs from "dayjs"
import { memo, useEffect, useState } from "react"

import { dispatchStartTimer, useModalAuth, useTimerModalAuth } from "@/store/hooks"
import { useForgotPasswordHelper } from "@/helpers"

const INITIAL_TIME = 120

export const TimerData = memo(function TimerData() {
    const [loading, setLoading] = useState(false)
    const email = useModalAuth(({ email }) => email)
    const phone = useModalAuth(({ phone }) => phone)
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

    function handleRequestNew() {
        if (!!email) {
            useForgotPasswordHelper
                .forgotPassword({
                    email: email,
                })
                .then(response => {
                    if (response.ok) {
                        if (response.res) {
                            // dispatchAuthModalVerification({
                            //     confirmationCode: response?.res?.password_reset_token!,
                            //     id: response?.res?.id!,
                            // })
                        }
                    }
                })
        }
        dispatchStartTimer()
    }

    return (
        <article data-column>
            {timerObject.timer ? (
                <>
                    <p>Запросить новый код можно через</p>
                    <b>
                        {timerObject.minute}:{timerObject.sec < 10 ? `0${timerObject.sec}` : timerObject.sec}
                    </b>
                </>
            ) : (
                <a onClick={handleRequestNew} data-loading={loading}>
                    Запросить новый код
                </a>
            )}
        </article>
    )
})
