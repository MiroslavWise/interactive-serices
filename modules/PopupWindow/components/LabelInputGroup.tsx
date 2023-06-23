import { type FC } from 'react'

type TLabelInputGroup = FC<{
        label: string
        rules?: boolean
        placeholder: string
        type: 'text' | 'email' | 'password'
        propsInput: any
        errorMessage?: string
}>

import styles from './style.module.scss'

export const LabelInputGroup: TLabelInputGroup = ({
        label, rules, placeholder, type, propsInput, errorMessage,
}) => {

        return (
                <div className={styles.groupLabelAndInputWrap}>
                        <label>{label} {rules ? <sup>*</sup> : null}</label>
                        <div className={styles.groupInputError}>
                                <input
                                        type={type}
                                        placeholder={placeholder}
                                        {...propsInput}
                                        className={errorMessage ? styles.errorInput : ''}
                                />
                                {
                                        errorMessage
                                                ? (
                                                        <p className={ styles.error}>
                                                                {errorMessage}
                                                        </p>
                                                ) : null
                                }
                        </div>
                </div>
        )
}