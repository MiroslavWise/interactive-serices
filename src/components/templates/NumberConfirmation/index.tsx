"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import { TimerData } from "./components/TimerData"
import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { functionAuthErrors, getUserId } from "@/services"
import { postVerifyPhone } from "@/services/phones"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchAddingPhoneNumber, dispatchNumberConfirmation, useAuth, useNumberConfirmation } from "@/store"

import styles from "./style.module.scss"

export const NumberConfirmation = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [loading, setLoading] = useState(false)
  const number = useNumberConfirmation(({ number }) => number)
  const visible = useNumberConfirmation(({ visible }) => visible)
  const { on } = useToast()

  const { refetch } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ code: string }>({ defaultValues: { code: "" } })

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      setLoading(true)

      postVerifyPhone({
        phone: number!,
        code: values.code,
      }).then((response) => {
        if (response.ok) {
          refetch()
          on({ message: "Номер телефона успешно добавлен" })
          close()
        } else {
          setError("code", { message: functionAuthErrors(response?.error?.message) })
        }
        setLoading(false)
      })
    }
  })

  function close() {
    dispatchNumberConfirmation(false, undefined)
  }

  function handleNew() {
    dispatchNumberConfirmation(false, undefined)

    dispatchAddingPhoneNumber(true)
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
        <header>
          <h3>Подтверждение номера</h3>
        </header>
        <form onSubmit={onSubmit}>
          <p>
            Отправили проверочный код на номер
            <span>{number ? (!["8", "+", 8].includes(number[0]) ? `+${number}` : number) : ""}</span>
          </p>
          <article>
            <fieldset data-test="fieldset-number-confirmation">
              <label>Код из СМС</label>
              <input
                type="number"
                inputMode="numeric"
                {...register("code", { required: true, minLength: 4, maxLength: 12 })}
                maxLength={12}
                minLength={4}
                data-error={!!errors.code}
                data-test="input-number-confirmation"
              />
              {!!errors?.code?.message ? <i>{errors?.code?.message}</i> : null}
            </fieldset>
            <TimerData />
          </article>
          <footer>
            <Button
              type="button"
              typeButton="regular-primary"
              label="Изменить номер"
              loading={loading}
              onClick={handleNew}
              data-test="button-number-confirmation-change"
            />
            <Button
              type="submit"
              typeButton="fill-primary"
              label="Продолжить"
              loading={loading}
              data-test="button-number-confirmation-submit"
            />
          </footer>
        </form>
      </section>
    </div>
  )
}
