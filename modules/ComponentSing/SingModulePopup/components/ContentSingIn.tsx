'use client'

import { useForm } from "react-hook-form";
import Image from 'next/image';
import { motion } from "framer-motion";

import type { TContentSignIn } from '../types';

import { LabelInputGroup } from './LabelInputGroup'
import { ButtonFill } from 'components/Buttons';
import { LinksSocial } from './LinksSocial';

import { regExEmail } from 'lib/constants';

import styles from './style.module.scss'

interface IValues {
        email: string
        password: string
        checkbox: boolean
}

export const ContentSingIn: TContentSignIn = ({ setType }) => {
        const { control, register, handleSubmit, formState: { errors } } = useForm<IValues>();

        const onEnter = async (values: IValues) => {
                console.log("values: ", values)
                // await axios.post('', {
                //         email: values.email,
                //         password: values.password,
                // })
        }

        return (
                <motion.div
                        className={styles.content}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                >
                        <form className={styles.form} onSubmit={handleSubmit(onEnter)}>
                                <section className={styles.section}>
                                        <LabelInputGroup
                                                label="Email"
                                                rules
                                                placeholder="Введите свой email"
                                                type="text"
                                                propsInput={register("email", { required: true, validate: (value) => regExEmail.test(value) })}
                                                errorMessage={errors.email ? "Требуется email" : ''}
                                        />
                                        <LabelInputGroup
                                                label="Пароль"
                                                rules
                                                placeholder="Введите свой пароль"
                                                type="password"
                                                propsInput={register("password", { required: true })}
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
                                        <a onClick={() => setType('ForgotPassword')}>Забыли пароль?</a>
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
                </motion.div>
        )
}