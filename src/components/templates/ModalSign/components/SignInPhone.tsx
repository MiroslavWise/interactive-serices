import { Controller, useForm } from "react-hook-form"
import { PhoneInput, defaultCountries, parseCountry } from "react-international-phone"
import { DispatchWithoutAction, type ReactNode, useState } from "react"

import { resolverPhoneSigIn, TSchemaPhoneSignIn } from "../utils/phone-sign-in.schema"

import { Button } from "@/components/common"

import { functionAuthErrors, serviceAuth } from "@/services"
import { dispatchAuthModal, dispatchAuthModalCodeVerification, dispatchStartTimer } from "@/store"

import styles from "../styles/form.module.scss"
import { cx } from "@/lib/cx"

const messageRegister = ({ cb }: { cb: DispatchWithoutAction }) => (
  <i>
    Аккаунт с данным номером не найден. Пройдите <a onClick={cb}>регистрацию</a>
  </i>
)

export const SignInPhone = ({ children, itemForgot }: { children: ReactNode; itemForgot: ReactNode }) => {
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    setError,
    watch,
    setValue,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<TSchemaPhoneSignIn>({ defaultValues: { phone: "" }, resolver: resolverPhoneSigIn })

  const onRegister = () => dispatchAuthModal({ type: "SignUp" })

  const submit = handleSubmit(function (values) {
    if (!loading) {
      setLoading(true)
      const phoneReplace = values.phone?.replaceAll(/[^\d]/g, "")

      serviceAuth.phone({ phone: phoneReplace }).then((response) => {
        if (response?.ok) {
          if (response.ok) {
            dispatchStartTimer()
            dispatchAuthModalCodeVerification({ phone: phoneReplace, idUser: response?.res?.id!, prevType: "SignIn" })
          }
        } else {
          const errorMessage = response?.error?.message
          if (errorMessage === "must agree") {
            setError("phone", { type: "on_register" })
          } else {
            setError("phone", { message: functionAuthErrors(errorMessage) })
          }
        }
        console.log(" serviceAuth phone: ", response)
        setLoading(false)
      })
    }
  })

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country)
    return ["ru", "by", "in"].includes(iso2)
  })

  return (
    <form onSubmit={submit}>
      <section className={styles.section}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <div data-label-input data-test="sign-in-phone" className="relative z-40">
              <label htmlFor={field.name}>Телефон</label>
              <PhoneInput
                defaultCountry="ru"
                countries={countries}
                placeholder="+7 999 000-00-00"
                value={field.value}
                onChange={(event) => field.onChange(event)}
                className={cx(
                  "w-full h-12 rounded-3xl border-none relative z-40",
                  "[&>input]:!w-full [&>input]:!h-full [&>input]:!rounded-3xl [&>input]:!text-text-primary [&>input]:!pl-[calc(0.875rem_+_1.625rem_+_0.5rem_+_1rem_+_0.5rem)]",
                  "[&>div]:absolute [&>div]:top-1/2 [&>div]:-translate-y-1/2 [&>div]:left-0.875 [&>div]:bg-transparent",
                  "[&>div>button]:!bg-transparent [&>div>button]:!border-none [&>div>button>div]:!flex [&>div>button>div]:!flex-row [&>div>button>div]:items-center [&>div>button>div]:gap-2",
                  "[&>div>ul]:!bg-BG-second [&>div>ul]:!p-1 [&>div>ul>li]:!bg-BG-second  hover:[&>div>ul>li]:!bg-grey-field focus:[&>div>ul>li]:!bg-grey-field [&>div>ul]:!rounded-xl [&>div>ul]:!shadow-menu-absolute",
                  "[&>div>ul>li>span]:!text-text-primary [&>div>ul>li>span]:!font-normal [&>div>ul>li>span]:!text-sm",
                  "[&>div>ul>li]:!py-3 [&>div>ul>li]:!px-2 [&>div>ul>li]:!flex [&>div>ul>li]:!flex-row [&>div>ul>li]:!items-center [&>div>ul>li]:!rounded-lg",
                )}
              />
              {!!errors.phone && errors.phone.type === "on_register" ? (
                messageRegister({ cb: onRegister })
              ) : !!errors.phone ? (
                <i>{errors?.phone?.message}</i>
              ) : null}
            </div>
          )}
        />
      </section>
      {itemForgot}
      <Button type="submit" typeButton="fill-primary" label="Войти" loading={loading} data-test="sign-in-phone-submit" />
      {children}
    </form>
  )
}
