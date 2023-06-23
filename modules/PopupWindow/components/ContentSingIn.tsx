'use client'

import { type FC, Dispatch, SetStateAction } from 'react'
import { useForm, Controller } from "react-hook-form";

import type { TTypeSing } from '../types';

import { LabelInputGroup } from './LabelInputGroup'
import { ButtonFill } from 'components/Buttons';
import { LinksSocial } from './LinksSocial';

import styles from './style.module.scss'
import Image from 'next/image';

interface IValues {
        email: String
        password: string
        checkbox: boolean
}

type TContentSingUp = FC<{
        setType: Dispatch<SetStateAction<TTypeSing>>
}>

export const ContentSingIn: TContentSingUp = ({ setType }) => {
        const { control, register, handleSubmit, formState: { errors } } = useForm<IValues>();

        const onEnter = (values: IValues) => {
                console.log("values: ", values)
        }

        return (
                <div className={styles.content}>
                        <form className={styles.form} onSubmit={handleSubmit(onEnter)}>
                                <section className={styles.section}>
                                        <LabelInputGroup
                                                label="Email"
                                                rules
                                                placeholder="Введите свой email"
                                                type="email"
                                                propsInput={register("email")}
                                                errorMessage={errors.email ? "Требуется email" : ''}
                                        />
                                        <LabelInputGroup
                                                label="Пароль"
                                                rules
                                                placeholder="Введите свой пароль"
                                                type="password"
                                                propsInput={register("password")}
                                                errorMessage={errors.password ? 'Требуется пароль' : ''}
                                        />
                                </section>
                                <div className={styles.RememberChange}>
                                        <div className={styles.checkRemember}>
                                                <label className={styles.checkbox}>
                                                        <input
                                                                type="checkbox"
                                                                defaultChecked={false}
                                                                {...register('checkbox')}
                                                                className=''
                                                        />
                                                        <span className={styles.checkmark}>
                                                                <Image
                                                                        src="/svg/check.svg"
                                                                        alt='check'
                                                                        width={16}
                                                                        height={16}
                                                                />
                                                        </span>
                                                </label>
                                                <p>Запомнить на 30 дней</p>
                                        </div>
                                        <a>Забыли пароль?</a>
                                </div>
                                <ButtonFill
                                        label="Войти"
                                        classNames="w-100"
                                        type="primary"
                                        submit="submit"
                                />
                                <LinksSocial />
                        </form>
                        <section className={styles.Register}>
                                <p>Нет аккаунта?</p>
                                <a onClick={() => setType('SingUp')}>Зарегистрироваться</a>
                        </section>
                </div>
        )
}