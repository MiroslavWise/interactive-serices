import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { ReactNode, memo, useState } from "react"

import { resolverEmailSignUp, TSchemaEmailSignUp } from "../utils/email-sign-up.schema"

import { Button } from "@/components/common"

import { cx } from "@/lib/cx"
import { getUserEmail } from "@/services"
import { dispatchAuthModalCreatePassword, dispatchAuthModalCurrentUser, useModalAuth } from "@/store"

import styles from "../styles/form.module.scss"

export const SignUpEmail = memo(function ({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)

  const email = useModalAuth(({ email }) => email)
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<TSchemaEmailSignUp>({
    defaultValues: {
      email: email || "",
      agree: false,
      marketing: false,
    },
    resolver: resolverEmailSignUp,
  })

  const onRegister = async (values: TSchemaEmailSignUp) => {
    if (!loading) {
      setLoading(true)
      getUserEmail(values.email!).then((response) => {
        const { data, error } = response
        console.log("response getEmailUser: ", response)
        if (!!data) {
          dispatchAuthModalCurrentUser({ user: data })
        } else {
          if (error?.message === "user not found") {
            dispatchAuthModalCreatePassword({
              email: values.email,
              agree: !!values.agree,
              marketing: !!values.marketing,
            })
          }
        }
        setLoading(false)
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <section className={styles.section}>
        <div data-label-input data-test="sign-up-email">
          <label htmlFor="email">Электронная почта</label>
          <input
            data-error={!!errors.email}
            type="text"
            placeholder="email_address@mail.com"
            inputMode="email"
            {...register("email", { required: true })}
          />
          {!!errors.email ? <i>{errors?.email?.message}</i> : null}
        </div>
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
                  href={{ pathname: "/legal/privacy-policy" }}
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
                    className={cx("w-3 h-3", !!field.value ? "opacity-100" : "opacity-0")}
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
        disabled={!watch("agree") || !watch("email")}
        data-test="sign-up-email-submit"
      />
      {children}
    </form>
  )
})
