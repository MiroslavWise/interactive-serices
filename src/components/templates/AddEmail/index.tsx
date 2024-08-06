"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { patchEmailPasswordUser } from "@/services"
import { dispatchAddEmail, dispatchCheckTheMail, useAddEmail, useAuth } from "@/store"

export const AddEmail = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
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
    formState: { errors },
    handleSubmit,
  } = useForm<IValues>()

  const onSubmit = handleSubmit((values) => {
    if (!loading) {
      setLoading(true)
      patchEmailPasswordUser({ ...values }, userId!).then((response) => {
        if (!!response.data) {
          close()
          dispatchCheckTheMail(true, values.email)
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
    <div
      className={cx(
        "wrapper-fixed",
        "flex flex-col items-center bg-translucent p-0 md:pt-[5.625rem] md:px-5 md:pb-5",
        visible ? "!z-[2000] !visible !opacity-100" : "-z-10 opacity-0 invisible",
      )}
    >
      <section data-section-modal className="relative w-full md:max-w-[30.625rem] max-md:h-full md:rounded-[2rem] bg-BG-second">
        <ButtonClose onClick={close} />
        <header className="w-full h-[4.25rem] md:h-[4.75rem] p-5 md:py-6 px-5 max-md:pb-4 flex items-center justify-center border-b border-solid border-grey-separator">
          <h3 className="text-text-primary text-center text-2xl font-semibold">Электронная почта</h3>
        </header>
        <form onSubmit={onSubmit} className="px-5 md:px-[3.75rem] py-10 w-full flex flex-col gap-10">
          <p className="text-text-primary text-sm font-normal">Введите электронную почту, которую хотите добавить и придумайте пароль</p>
          <article className="w-full flex flex-col gap-5">
            <fieldset className="w-full flex flex-col gap-2">
              <label className="text-text-primary text-sm font-medium">Электронная почта</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email_address@mail.com"
                data-error={!!errors?.email?.message}
              />
              {errors.email?.message ? <i className="text-text-error text-xs font-medium -mt-1">{errors?.email?.message}</i> : null}
            </fieldset>
            <fieldset className="w-full flex flex-col gap-2">
              <label className="text-text-primary text-sm font-medium">Пароль</label>
              <div className="w-full h-12 relative">
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
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 w-5 h-5"
                />
              </div>
              {errors.password ? <i className="text-text-error text-xs font-medium -mt-1">{errors.password.message}</i> : null}
            </fieldset>
            <fieldset className="w-full flex flex-col gap-2">
              <label className="text-text-primary text-sm font-medium">Повторите пароль</label>
              <div className="w-full h-12 relative">
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
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 w-5 h-5"
                />
              </div>
              {errors.repeat ? <i className="text-text-error text-xs font-medium -mt-1">{errors.repeat.message}</i> : null}
            </fieldset>
          </article>
          <Button type="submit" typeButton="fill-primary" label="Добавить" loading={loading} disabled={disabled} />
        </form>
      </section>
    </div>
  )
}

interface IValues {
  email: string
  password: string
  repeat: string
}
