import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { type ReactNode, memo, useState } from "react"

import { EnumSign } from "@/types/enum"
import { resolverPhoneSignUp, TSchemaPhoneSignUp } from "../utils/phone-sign-up.schema"

import Button from "@/components/common/Button"
import InputCountry from "@/components/common/InputCountry"

import { cx } from "@/lib/cx"
import { functionAuthErrors, serviceAuth } from "@/services"
import { dispatchAuthModalCodeVerification, dispatchStartTimer, useModalAuth, useUTM } from "@/store"

import styles from "../styles/form.module.scss"

export const SignUpPhone = memo(function SignUpPhone({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)
  const phone = useModalAuth(({ phone }) => phone)

  const utm_source = useUTM(({ utm_source }) => utm_source)
  const utm_medium = useUTM(({ utm_medium }) => utm_medium)
  const utm_campaign = useUTM(({ utm_campaign }) => utm_campaign)
  const utm_content = useUTM(({ utm_content }) => utm_content)

  const { handleSubmit, watch, setError, control, setValue } = useForm<TSchemaPhoneSignUp>({
    defaultValues: {
      phone: phone,
    },
    resolver: resolverPhoneSignUp,
  })

  const onRegister = async (values: TSchemaPhoneSignUp) => {
    if (!loading) {
      setLoading(true)
      const phoneReplace = String(values.phone).replaceAll(/[^\d]/g, "")

      const stringParams = new URLSearchParams()

      if (utm_source) {
        stringParams.set("utm_source", utm_source)
      }
      if (utm_medium) {
        stringParams.set("utm_medium", utm_medium)
      }
      if (utm_campaign) {
        stringParams.set("utm_campaign", utm_campaign)
      }
      if (utm_content) {
        stringParams.set("utm_content", utm_content)
      }

      const string = stringParams.toString()

      serviceAuth
        .phone({
          phone: phoneReplace,
          params: string ? string : undefined,
          agree: !!values.agree,
          marketing: !!values.marketing,
        })
        .then((response) => {
          console.log("response: ", response)
          setLoading(false)
          if (response.ok) {
            dispatchStartTimer()
            dispatchAuthModalCodeVerification({ phone: phoneReplace, idUser: response?.res?.id!, prevType: EnumSign.SignUp })
          } else {
            console.log("response: error: ", response)
            if (["BadRequestException", "Bad Request"].includes(response?.error?.name)) {
              const errorMessage: string = String(
                Array.isArray(response?.error?.message) ? response?.error?.message[0] : response?.error?.message,
              )
              if (errorMessage.includes("phone must be longer than or equal")) {
                setError("phone", {
                  message: `Длина номера телефона должна быть - ${errorMessage
                    .replace("phone must be longer than or equal to ", "")
                    .replace(" characters", "")} символов`,
                })
              }
            } else {
              const errorMessage = response?.error?.message
              setError("phone", { message: functionAuthErrors(errorMessage) })
            }
          }
        })
    }
  }

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <section className={styles.section}>
        <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <div data-label-input data-test="sign-up-phone">
              <label htmlFor={field.name}>Телефон</label>
              <InputCountry
                {...field}
                replaceValue={(value) => {
                  field.onChange(value)
                }}
              />
              {!!error ? <i>{error?.message}</i> : null}
            </div>
          )}
        />
      </section>
      <div className={cx("flex flex-col items-start justify-start w-full z-[3]", "*:flex *:flex-row *:gap-2")}>
        <Controller
          name="agree"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <label className={cx("h-5 w-5 mt-3 relative")}>
                <input
                  type="checkbox"
                  onClick={() => setValue(field.name, !field.value)}
                  className={cx("absolute opacity-0 inset-0 cursor-pointer z-[100]")}
                />
                <span
                  className={cx(
                    "relative flex items-center justify-center w-4 h-4 border border-solid bg-BG-second cursor-pointer rounded-[0.25rem] transition-all",
                    !!field.value ? "border-text-accent bg-text-accent" : "border-text-accent",
                  )}
                >
                  <img
                    src="/svg/check-white.svg"
                    alt="check"
                    width={16}
                    height={16}
                    className={cx("w-3 h-3 transition-all", !!field.value ? "opacity-100" : "opacity-0")}
                  />
                </span>
              </label>
              <p
                className={cx(
                  "text-text-primary text-sm font-medium !text-left my-3",
                  !!fieldState.error ? "text-text-error *:text-text-error" : "text-text-primary",
                )}
              >
                Даю согласие на обработку персональных данных в соответствии с&nbsp;
                <Link
                  href={{ pathname: "/legal/privacy-policy/" }}
                  target="_blank"
                  rel="license"
                  referrerPolicy="no-referrer"
                  className="text-text-accent cursor-pointer"
                >
                  Политикой конфиденциальности
                </Link>
              </p>
            </div>
          )}
        />
        <Controller
          name="marketing"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <label className={cx("h-5 w-5 mt-3 relative")}>
                <input
                  type="checkbox"
                  onClick={() => setValue(field.name, !field.value)}
                  className={cx("absolute opacity-0 inset-0 cursor-pointer z-[100]")}
                />
                <span
                  className={cx(
                    "relative flex items-center justify-center w-4 h-4 border border-solid bg-BG-second cursor-pointer rounded-[0.25rem] transition-all",
                    !!field.value ? "border-text-accent bg-text-accent" : "border-text-accent",
                  )}
                >
                  <img
                    src="/svg/check-white.svg"
                    alt="check"
                    width={16}
                    height={16}
                    className={cx("w-3 h-3 transition-all", !!field.value ? "opacity-100" : "opacity-0")}
                  />
                </span>
              </label>
              <p
                className={cx(
                  "text-text-primary text-sm font-medium !text-left my-3",
                  !!fieldState.error ? "text-text-error *:text-text-error" : "text-text-primary",
                )}
              >
                Даю согласие на&nbsp;
                <Link href={{ pathname: "/legal/ads-agreement" }} target="_blank" className="text-text-accent cursor-pointer">
                  маркетинговые коммуникации
                </Link>
              </p>
            </div>
          )}
        />
      </div>
      <Button
        type="submit"
        typeButton="fill-primary"
        label="Зарегистрироваться"
        loading={loading}
        disabled={!watch("agree") || !watch("phone")}
        data-test="sign-up-phone-submit"
      />
      {children}
    </form>
  )
})
