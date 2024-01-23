import { useForm, Controller } from "react-hook-form"
import { type ReactNode, memo, useState, Dispatch, SetStateAction } from "react"

import { IValuesSignForm } from "../types/types"

import { Button } from "@/components/common"

import { useTokenHelper } from "@/helpers"
import { serviceUser } from "@/services/users"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchAuthModal, dispatchOnboarding, useAuth } from "@/store/hooks"

import styles from "../styles/form.module.scss"
import { queryClient } from "@/context"

export const SignInEmail = memo(function SignInEmail({
    children,
    itemForgot,
    setValueSecret,
}: {
    children: ReactNode
    itemForgot: ReactNode
    setValueSecret: Dispatch<
        SetStateAction<{
            url: string
            secret: string
        }>
    >
}) {
    const [loading, setLoading] = useState(false)
    const [isPass, setIsPass] = useState(false)
    const { on } = useToast()
    const setToken = useAuth(({ setToken }) => setToken)
    const changeAuth = useAuth(({ changeAuth }) => changeAuth)

    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm<IValuesSignForm>({ defaultValues: { email: "", password: "" } })

    function onEnter(value: IValuesSignForm) {
        if (!loading) {
            setLoading(true)
            useTokenHelper
                .login({
                    email: value.email,
                    password: value.password,
                })
                .then((response) => {
                    if (response?.error?.code === 401 && response?.error?.message === "Unauthorized") {
                        setError("password", { message: "Не верный пароль" })
                        return
                    }
                    if (response.error?.code === 401 && response?.error?.message === "user is not verified") {
                        on(
                            {
                                message: "Вы не потвердили профиль через уведомление, которое вам пришло на почту!",
                            },
                            "warning",
                        )
                        return
                    }
                    if (response.error?.code === 404) {
                        setError("email", { message: "Данного пользователя не существует" })
                        return
                    }
                    if (response?.res?.secret && response?.res?.otpAuthUrl) {
                        setValueSecret({
                            secret: response?.res?.secret!,
                            url: response?.res?.otpAuthUrl!,
                        })
                        dispatchAuthModal({ type: "FirstLoginQR" })
                        return
                    }
                    if (!!response?.error && !response?.ok) {
                        console.log("ERROR ---У нас возникла ошибка, мы сейчас её решаем!---", response?.error)
                        on(
                            {
                                message: "У нас возникла ошибка, мы сейчас её решаем!",
                            },
                            "warning",
                        )
                        return
                    }
                    if (response.ok) {
                        if (response.res?.accessToken && response?.res?.refreshToken && response?.res?.tokenType) {
                            queryClient
                                .fetchQuery({
                                    queryFn: () => serviceUser.getId(response?.res?.id!),
                                    queryKey: ["user", { userId: response?.res?.id }],
                                })
                                .then((responseUser) => {
                                    setToken({
                                        ok: true,
                                        token: response?.res?.accessToken!,
                                        refreshToken: response?.res?.refreshToken!,
                                        expires: response?.res?.expires!,
                                        userId: response?.res?.id!,
                                        email: value?.email!,
                                    })
                                    if (!responseUser?.res?.profile) {
                                        dispatchAuthModal({ visible: false })
                                        dispatchOnboarding("open")
                                        return
                                    }
                                    if (!!responseUser?.res?.profile) {
                                        dispatchAuthModal({ visible: false })
                                        return changeAuth()
                                    }
                                })
                            dispatchAuthModal({ visible: false })
                            return
                        }
                        dispatchAuthModal({ type: "OtpCode" })
                        return
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const submit = handleSubmit(onEnter)

    return (
        <form onSubmit={submit}>
            <section className={styles.section}>
                <Controller
                    name="email"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                        <div data-label-input>
                            <label htmlFor={field.name}>Email</label>
                            <input autoComplete="off" type="email" placeholder="Введите свой email" inputMode="email" {...field} data-error={!!errors.email} />
                            {!!errors?.[field.name] ? <i>{errors?.[field.name]?.message}</i> : null}
                        </div>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: true, minLength: 5 }}
                    render={({ field }) => (
                        <div data-label-input data-password>
                            <label htmlFor={field.name}>Пароль</label>
                            <div>
                                <input {...field} autoComplete="off" placeholder="Введите свой пароль" type={isPass ? "text" : "password"} />
                                <img
                                    onClick={() => setIsPass((prev) => !prev)}
                                    src={isPass ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                                    alt="eye"
                                    width={20}
                                    height={20}
                                    data-eye
                                />
                            </div>
                            {!!errors?.[field.name] ? <i>{errors?.[field.name]?.message}</i> : null}
                        </div>
                    )}
                />
            </section>
            {itemForgot}
            <Button type="submit" typeButton="fill-primary" label="Войти" loading={loading} />
            {children}
        </form>
    )
})
