import { memo, useEffect, useState } from "react"

import { postPhone } from "@/services/posts/phones"
import { dayFormat, getMillisecond } from "@/helpers"
import { dispatchStartTimerNumberConfirmation, useNumberConfirmation, useTimerNumberConfirmation } from "@/store"

const INITIAL_TIME = 120

export const TimerData = memo(() => {
  const [loading, setLoading] = useState(false)
  const number = useNumberConfirmation(({ number }) => number)
  const time = useTimerNumberConfirmation(({ time }) => time)
  const [timerObject, setTimerObject] = useState({
    timer: INITIAL_TIME,
    sec: 0,
    minute: Math.floor(INITIAL_TIME / 60),
  })

  useEffect(() => {
    if (time) {
      const interval = setInterval(() => {
        const intSecondNow = getMillisecond(dayFormat(new Date(), "hh:mm:ss dd.MM.yyyy")!) / 1000
        const intSecondOld = getMillisecond(time) / 1000

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
      }, 500)

      const deleteInterval = setTimeout(() => {
        clearInterval(interval)
      }, (INITIAL_TIME + 7) * 500)

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
      if (!!number) {
        postPhone({
          phone: number,
        }).then((response) => {
          console.log("--REQUEST NEW CODE SMS PHONE---", response)
          if (response.ok) {
            dispatchStartTimerNumberConfirmation()
          } else {
          }
          setLoading(false)
        })
      }
    }
  }

  return (
    <article data-column data-test="article-timer-data">
      {timerObject.timer ? (
        <>
          <p>Запросить новый код можно через</p>
          <b>
            {timerObject.minute}:{timerObject.sec < 10 ? `0${timerObject.sec}` : timerObject.sec}
          </b>
        </>
      ) : (
        <p>
          Не приходит код?&nbsp;
          <a onClick={handleRequestNew} data-loading={loading} data-test="a-timer-data-request-new">
            Отправить снова
          </a>
        </p>
      )}
    </article>
  )
})
