"use client"

import { useState } from "react"
import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"

import { Button, ButtonClose } from "@/components/common"

import type { IValues } from "./types"

import { cx } from "@/lib/cx"
import { useToast } from "@/helpers/hooks/useToast"
import { postNewPassword, serviceAuthErrors } from "@/services"
import { dispatchChangePassword, useChangePassword } from "@/store"

import styles from "./style.module.scss"

export const ChangePassword = () => {
  const [loading, setLoading] = useState(false)
  const [visiblePass, setVisiblePass] = useState({
    old: false,
    new: false,
    repeat: false,
  })
  const { on } = useToast()
  const visible = useChangePassword(({ visible }) => visible)

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IValues>({})

  const onSubmit = handleSubmit((data) => {
    if (!loading) {
      setLoading(true)
      console.log("data: ", data)

      postNewPassword(data).then((response) => {
        console.log("response postNewPassword: ", response)
        if (response.ok) {
          on({ message: "Пароль успешно обновлён" })
          close()
        } else {
          const messageError = response.error?.message?.toLowerCase()
          if (serviceAuthErrors.has(messageError)) {
            if (messageError === "password is incorrect") {
              setError("oldPassword", { message: serviceAuthErrors.get(messageError) })
            }
            if (messageError === "password is not match") {
              setError("password", { message: serviceAuthErrors.get(messageError) })
            } else {
              setError("root", { message: messageError })
            }
          } else {
            setError("root", { message: messageError })
          }
        }
        flushSync(() => {
          setLoading(false)
        })
      })
    }
  })

  function close() {
    dispatchChangePassword(false)
  }

  const disabled = !watch("oldPassword") || !watch("password") || !watch("repeat") || watch("password") !== watch("repeat")

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
        <header>
          <h3>Изменение пароля</h3>
        </header>
        <form onSubmit={onSubmit}>
          <p>Введите ваш текущий пароль для подтверждения аккаунта.</p>
          <article>
            <fieldset>
              <label>Старый пароль</label>
              <div data-input>
                <input
                  type={visiblePass.old ? "text" : "password"}
                  placeholder="Введите пароль"
                  {...register("oldPassword", { required: { message: "Обязательное поле", value: true } })}
                  data-error={!!errors.oldPassword}
                />
                <img
                  onClick={() =>
                    setVisiblePass((prev) => ({
                      ...prev,
                      old: !prev.old,
                    }))
                  }
                  src={visiblePass.old ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                  alt="eye"
                  width={20}
                  height={20}
                />
              </div>
              {errors.oldPassword ? <i>{errors.oldPassword.message}</i> : null}
            </fieldset>
            <fieldset>
              <label>Пароль</label>
              <div data-input>
                <input
                  type={visiblePass.new ? "text" : "password"}
                  placeholder="Введите пароль"
                  {...register("password", { required: { message: "Обязательное поле", value: true } })}
                  data-error={!!errors.password}
                />
                <img
                  onClick={() =>
                    setVisiblePass((prev) => ({
                      ...prev,
                      old: !prev.new,
                    }))
                  }
                  src={visiblePass.new ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                  alt="eye"
                  width={20}
                  height={20}
                />
              </div>
              {errors.password ? <i>{errors.password.message}</i> : null}
            </fieldset>
            <fieldset>
              <label>Повторите пароль</label>
              <div data-input>
                <input
                  type={visiblePass.repeat ? "text" : "password"}
                  placeholder="Введите пароль ещё раз"
                  {...register("repeat", { required: { message: "Обязательное поле", value: true } })}
                  data-error={!!errors.password}
                />
                <img
                  onClick={() =>
                    setVisiblePass((prev) => ({
                      ...prev,
                      old: !prev.repeat,
                    }))
                  }
                  src={visiblePass.repeat ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                  alt="eye"
                  width={20}
                  height={20}
                />
              </div>
              {errors.repeat ? <i>{errors.repeat.message}</i> : null}
            </fieldset>
            {errors.root?.message ? <i>{errors.root?.message}</i> : null}
          </article>
          <Button type="submit" typeButton="fill-primary" label="Подтвердить" disabled={disabled} loading={loading} />
        </form>
      </section>
    </div>
  )
}
