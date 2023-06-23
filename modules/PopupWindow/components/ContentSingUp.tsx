'use client'

import { type FC, type Dispatch, type SetStateAction } from 'react'
import { useForm } from "react-hook-form";

import type { TTypeSing } from '../types';

import { LabelInputGroup } from './LabelInputGroup'
import { ButtonFill } from 'components/Buttons';
import { LinksSocial } from './LinksSocial';

import styles from './style.module.scss'
import Image from 'next/image';

interface IValues{
        email: string
        number?: string
        password: string
        renewed_password: string
}

type TContentSingUp = FC<{
        setType: Dispatch<SetStateAction<TTypeSing>>

}>

export const ContentSingUp: TContentSingUp = ({ setType }) => {
        const { register, handleSubmit, formState: { errors } } = useForm<IValues>();
        
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
                                                errorMessage={errors.email ? "Требуется email" : ''}
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
                                                errorMessage={errors.password ? 'Требуется пароль' : ''}
                                        />
                                        <LabelInputGroup
                                                label="Подтвердите пароль"
                                                rules
                                                placeholder="Введите пароль еще раз"
                                                type="password"
                                                propsInput={register("renewed_password")}
                                                errorMessage={errors.renewed_password ? 'Требуется пароль' : ''}
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
                        <section className={`${styles.Register} cursor-pointer`} onClick={() => setType('SingIn')}>
                                <Image
                                        src="/svg/arrow-left.svg"
                                        alt="arrow"
                                        width={20}
                                        height={20}
                                />
                                <p>Назад к странице входа</p>
                        </section>
                </div>
        )
}