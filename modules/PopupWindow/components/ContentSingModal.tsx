'use client'

import { type FC } from 'react'
import { useForm } from "react-hook-form";

import { LabelInputGroup } from './LabelInputGroup'
import { ButtonFill } from 'components/Buttons';

import styles from './style.module.scss'
import { LinksSocial } from './LinksSocial';

interface IValues{
        email: string
        number?: string
        password: string
        renewed_password: string
}

type TContentSingModal = FC<{}>

export const ContentSingModal: TContentSingModal = ({ }) => {
        const { register, handleSubmit } = useForm<IValues>();
        
        const onRegister = (values: IValues) => {
                console.log("values: ", values)
        }

        return (
                <div className={styles.content}>
                        <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
                                <section className={styles.section}>
                                        <LabelInputGroup
                                                label="Email"
                                                rules
                                                placeholder="Введите свой email"
                                                type="email"
                                                propsInput={register("email")}
                                        />
                                        <LabelInputGroup
                                                label="Номер телеграмма"
                                                placeholder="Введите свой номер"
                                                type="text"
                                                propsInput={register("number")}
                                        />
                                        <LabelInputGroup
                                                label="Пароль"
                                                rules
                                                placeholder="Введите свой пароль"
                                                type="password"
                                                propsInput={register("password")}
                                        />
                                        <LabelInputGroup
                                                label="Подтвердите пароль"
                                                rules
                                                placeholder="Введите пароль еще раз"
                                                type="password"
                                                propsInput={register("renewed_password")}
                                        />
                                </section>
                                <p>Регистрируясь, вы соглашаетесь с <a>Правилами пользования</a> и <a>Политикой конфиденциальности</a></p>
                                <ButtonFill
                                        label="Зарегистрироваться"
                                        classNames="w-100"
                                        type="primary"
                                        submit="submit"
                                />
                                <LinksSocial />
                        </form>
                </div>

        )
}