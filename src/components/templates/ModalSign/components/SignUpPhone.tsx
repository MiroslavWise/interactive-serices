import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { type ReactNode, memo, useState } from "react"
import { PhoneInput, defaultCountries, parseCountry } from "react-international-phone"

import { resolverPhoneSignUp, TSchemaPhoneSignUp } from "../utils/phone-sign-up.schema"

import { Button } from "@/components/common"

import { functionAuthErrors, serviceAuth } from "@/services/auth"
import { dispatchAuthModalCodeVerification, dispatchStartTimer, useModalAuth, useUTM } from "@/store"

import styles from "../styles/form.module.scss"
import { cx } from "@/lib/cx"

export const SignUpPhone = memo(function SignUpPhone({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)
  const phone = useModalAuth(({ phone }) => phone)

  const utm_source = useUTM(({ utm_source }) => utm_source)
  const utm_medium = useUTM(({ utm_medium }) => utm_medium)
  const utm_campaign = useUTM(({ utm_campaign }) => utm_campaign)
  const utm_content = useUTM(({ utm_content }) => utm_content)

  const {
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
    setError,
    clearErrors,
    control,
    setValue,
  } = useForm<TSchemaPhoneSignUp>({
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
          if (response.ok) {
            dispatchStartTimer()
            dispatchAuthModalCodeVerification({ phone: phoneReplace, idUser: response?.res?.id!, prevType: "SignUp" })
          } else {
            const errorMessage = response?.error?.message
            setError("phone", { message: functionAuthErrors(errorMessage) })
          }
          setLoading(false)
        })
    }
  }

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country)
    return ["ru", "by", "in"].includes(iso2)
  })

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <section className={styles.section}>
        <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <div data-label-input data-test="sign-up-phone">
              <label htmlFor={field.name} title="Телефон">
                Телефон
              </label>
              <PhoneInput
                defaultCountry="ru"
                countries={countries}
                placeholder="+7 999 000-00-00"
                value={field.value}
                onChange={(event) => field.onChange(event)}
                className={cx(
                  "w-full h-12 rounded-3xl border-none relative z-40",
                  "[&>input]:!w-full [&>input]:!h-full [&>input]:!rounded-3xl [&>input]:!text-text-primary [&>input]:!pl-[calc(0.875rem_+_1.625rem_+_0.5rem_+_1rem_+_0.5rem)]",
                  "[&>div]:absolute [&>div]:!z-50 [&>div]:top-1/2 [&>div]:-translate-y-1/2 [&>div]:left-0.875 [&>div]:bg-transparent",
                  "[&>div>button]:!bg-transparent [&>div>button]:!border-none [&>div>button>div]:!flex [&>div>button>div]:!flex-row [&>div>button>div]:items-center [&>div>button>div]:gap-2",
                  "[&>div>ul]:!bg-BG-second [&>div>ul]:!p-1 [&>div>ul>li]:!bg-BG-second  hover:[&>div>ul>li]:!bg-grey-field focus:[&>div>ul>li]:!bg-grey-field [&>div>ul]:!rounded-xl [&>div>ul]:!shadow-menu-absolute",
                  "[&>div>ul>li>span]:!text-text-primary [&>div>ul>li>span]:!font-normal [&>div>ul>li>span]:!text-sm",
                  "[&>div>ul>li]:!py-3 [&>div>ul>li]:!px-2 [&>div>ul>li]:!flex [&>div>ul>li]:!flex-row [&>div>ul>li]:!items-center [&>div>ul>li]:!rounded-lg",
                )}
              />
              {!!error ? <i>{error?.message}</i> : null}
            </div>
          )}
        />
      </section>
      <div className={styles.RememberChange}>
        <Controller
          name="agree"
          control={control}
          render={({ field, fieldState }) => (
            <div className={styles.checkRemember}>
              <label className={styles.checkbox} data-check={!!field.value}>
                <input type="checkbox" onClick={() => setValue(field.name, !field.value)} />
                <span className={styles.checkmark}>
                  <img src="/svg/check-white.svg" alt="check" width={16} height={16} data-visible={!!field.value} />
                </span>
              </label>
              <p data-terms data-error={!!fieldState.error}>
                Даю согласие на обработку персональных данных в соответствии с&nbsp;
                <Link href={{ pathname: "/legal/privacy-policy/" }} target="_blank" rel="license" referrerPolicy="no-referrer">
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
            <div className={styles.checkRemember}>
              <label className={styles.checkbox} data-check={!!field.value}>
                <input type="checkbox" onClick={() => setValue(field.name, !field.value)} />
                <span className={styles.checkmark}>
                  <img src="/svg/check-white.svg" alt="check" width={16} height={16} data-visible={!!field.value} />
                </span>
              </label>
              <p data-terms data-error={!!fieldState.error}>
                Даю согласие на&nbsp;
                <Link href={{ pathname: "/legal/ads-agreement" }} target="_blank">
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
