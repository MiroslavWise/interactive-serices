import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/common"

import { useToast } from "@/helpers/hooks/useToast"
import { useForgotPasswordHelper, usePush } from "@/helpers"
import { RegistrationService } from "@/services/auth/registrationService"
import { dispatchAuthModal, dispatchAuthModalInformationCreateAccount, useModalAuth, useModalAuthEmailOrPhone } from "@/store/hooks"

import styles from "../styles/form.module.scss"

export const ContentCreatePassword = () => {
    const { handleReplace } = usePush()
    const { on } = useToast()
    const typeEmailOrPhone = useModalAuthEmailOrPhone(({ typeEmailOrPhone }) => typeEmailOrPhone)
    const [isPass, setIsPass] = useState(false)
    const [isPass_, setIsPass_] = useState(false)
    const [loading, setLoading] = useState(false)
    const type = useModalAuth(({ type }) => type)
    const codeReset = useModalAuth(({ codeReset }) => codeReset)
    const email = useModalAuth(({ email }) => email)

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
    } = useForm<IValues>({
        defaultValues: {
            password: "",
            repeat_password: "",
        },
    })

    function onEnter(values: IValues) {
        if (!loading) {
            setLoading(true)
            if (type === "ResetPassword" && !!codeReset) {
                useForgotPasswordHelper
                    .resetPassword({
                        token: codeReset,
                        password: values.password,
                        repeat: values.repeat_password,
                    })
                    .then((response) => {
                        if (response.code === 400) {
                            setError("password", { message: "no_repeat" })
                            setError("repeat_password", { message: "no_repeat" })
                            return
                        }
                        if ([401 || 403].includes(response?.code!)) {
                            on({ message: "Время восстановления пароля истекло" }, "warning")
                            handleReplace("/")
                            return
                        }
                        if (response.code === 500) {
                            on(
                                {
                                    message: "Извините, у нас какиe-то ошибки. Мы работаем над этим :(",
                                },
                                "error",
                            )
                        }
                        if (response.ok && !!response?.res) {
                            on(
                                {
                                    message: "Пароль успешно изменён. Вы можете войти на аккаунт!",
                                },
                                "success",
                            )
                            handleReplace("/")
                            dispatchAuthModal({ type: "SignIn" })
                            return
                        }
                    })
                    .finally(() => {
                        setLoading(false)
                    })
                return
            }
            if (!!email && typeEmailOrPhone === "email") {
                RegistrationService.registration({
                    email: email,
                    password: values.password!,
                    repeat: values.repeat_password!,
                })
                    .then((response) => {
                        if (response.ok) {
                            if (response.res) {
                                dispatchAuthModalInformationCreateAccount(email)
                                setLoading(false)
                            }
                        } else {
                            setLoading(false)
                        }
                    })
                    .finally(() => {
                        setLoading(false)
                    })
                return
            } else {
                setLoading(false)
                return
            }
        }
    }

    return (
        <div className={styles.content}>
            <p>Придумайте пароль для входа в аккаунт</p>
            <form className={styles.form} onSubmit={handleSubmit(onEnter)}>
                <div data-label-input data-password>
                    <label htmlFor="password">Пароль</label>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true, minLength: 5 }}
                        render={({ field }) => (
                            <div>
                                <input {...field} placeholder="Введите свой пароль" type={isPass ? "text" : "password"} />
                                <img
                                    onClick={() => setIsPass((prev) => !prev)}
                                    src={isPass ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                                    alt="eye"
                                    width={20}
                                    height={20}
                                    data-eye
                                />
                            </div>
                        )}
                    />
                    {errors.password ? (
                        <i>
                            {errors.password?.message === "validate_register"
                                ? "Пароль должен содержать хотя бы одну большую и маленькую букву и цифру."
                                : errors.password
                                ? "Требуется пароль"
                                : ""}
                        </i>
                    ) : null}
                </div>
                <div data-label-input data-password>
                    <label htmlFor="repeat_password">Подтвердите пароль</label>
                    <Controller
                        name="repeat_password"
                        control={control}
                        rules={{
                            required: true,
                            minLength: 5,
                            validate: (value) => (value === watch("repeat_password") ? true : "no_repeat"),
                        }}
                        render={({ field }) => (
                            <div>
                                <input {...field} placeholder="Введите пароль еще раз" type={isPass ? "text" : "password"} />
                                <img
                                    onClick={() => setIsPass_((prev) => !prev)}
                                    src={isPass_ ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                                    alt="eye"
                                    width={20}
                                    height={20}
                                    data-eye
                                />
                            </div>
                        )}
                    />
                    {errors.repeat_password ? (
                        <i>
                            {errors?.repeat_password && errors?.repeat_password?.message === "no_repeat"
                                ? "Пароли не совпадают"
                                : errors?.repeat_password
                                ? "Требуется пароль"
                                : ""}
                        </i>
                    ) : null}
                </div>
                <Button style={{ marginTop: "1rem" }} type="submit" typeButton="fill-primary" label="Продолжить" />
            </form>
        </div>
    )
}

interface IValues {
    password: string
    repeat_password: string
}
