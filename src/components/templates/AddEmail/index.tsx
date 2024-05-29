"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { IValues } from "./types"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { patchEmailPasswordUser } from "@/services"
import { dispatchAddEmail, dispatchCheckTheMail, useAddEmail, useAuth_ } from "@/store"

import styles from "./style.module.scss"

export const AddEmail = () => {
  const { id: userId } = useAuth_(({ auth }) => auth) ?? {}
  const [loading, setLoading] = useState(false)
  const [visiblePass, setVisiblePass] = useState({
    password: false,
    repeat: false,
  })
  const visible = useAddEmail(({ visible }) => visible)

  function close() {
    dispatchAddEmail(false)
  }

  const {
    register,
    watch,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<IValues>()

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      setLoading(true)
      patchEmailPasswordUser({ ...values }, userId!).then((response) => {
        if (response.ok) {
          close()
          requestAnimationFrame(() => {
            dispatchCheckTheMail(true, values.email)
          })
        } else {
        }
        setLoading(false)
      })
    }
  })

  const disabled =
    !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(watch("email")) ||
    !watch("password") ||
    watch("password") !== watch("repeat")

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
        <header>
          <h3>Электронная почта</h3>
        </header>
        <form onSubmit={onSubmit}>
          <p>Введите электронную почту, которую хотите добавить и придумайте пароль</p>
          <article>
            <fieldset>
              <label>Электронная почта</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email_address@mail.com"
                data-error={!!errors?.email?.message}
              />
              {errors.email?.message ? <i>{errors?.email?.message}</i> : null}
            </fieldset>
            <fieldset>
              <label>Пароль</label>
              <div data-input>
                <input
                  type={visiblePass.password ? "text" : "password"}
                  placeholder="Введите пароль"
                  {...register("password", { required: { message: "Обязательное поле", value: true } })}
                  data-error={!!errors.password}
                />
                <img
                  onClick={() =>
                    setVisiblePass((prev) => ({
                      ...prev,
                      old: !prev.password,
                    }))
                  }
                  src={visiblePass.password ? "/svg/eye.svg" : "/svg/eye-off.svg"}
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
          </article>
          <Button type="submit" typeButton="fill-primary" label="Добавить" loading={loading} disabled={disabled} />
        </form>
      </section>
    </div>
  )
}
