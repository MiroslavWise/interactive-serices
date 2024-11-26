import { useEffect, useState } from "react"

import { serviceAuth } from "@/services"
import { dispatchAuthModalCodeVerification, dispatchStartTimer, useModalAuth, useTimerModalAuth } from "@/store"

const INITIAL_TIME = 120

function TimerData() {
  const [loading, setLoading] = useState(false)
  const phone = useModalAuth(({ phone }) => phone)
  const prevType = useModalAuth(({ prevType }) => prevType)
  const time = useTimerModalAuth(({ time }) => time)
  const [timerObject, setTimerObject] = useState({
    timer: INITIAL_TIME,
    sec: 0,
    minute: Math.floor(INITIAL_TIME / 60),
  })

  useEffect(() => {
    if (time) {
      const interval = setInterval(() => {
        const intSecondNow = Date.now() / 1000
        const intSecondOld = time

        const seconds = INITIAL_TIME - Math.round(intSecondNow - intSecondOld)
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
      }, (INITIAL_TIME + 1) * 1000)

      return () => {
        clearTimeout(deleteInterval)
        if (interval) {
          clearInterval(interval)
        }
      }
    }
  }, [time])

  function handleRequestNew() {
    if (!loading) {
      setLoading(true)
      if (!!phone) {
        serviceAuth
          .phone({
            phone: phone,
          })
          .then((response) => {
            console.log("--REQUEST NEW CODE SMS PHONE---", response)
            if (response.ok) {
              dispatchStartTimer()
              dispatchAuthModalCodeVerification({ phone: phone, idUser: response?.res?.id!, prevType: prevType })
            } else {
            }
            setLoading(false)
          })
      }
    }
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
        <p>
          Не приходит код?{" "}
          <a onClick={handleRequestNew} data-loading={loading}>
            Отправить снова
          </a>
        </p>
      )}
    </article>
  )
}

TimerData.displayName = "TimerData"
export default TimerData
