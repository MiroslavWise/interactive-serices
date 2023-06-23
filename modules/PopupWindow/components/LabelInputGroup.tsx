import { type FC } from 'react'

type TLabelInputGroup = FC<{
        label: string
        rules?: boolean
        placeholder: string
        type: 'text' | 'email' | 'password'
        propsInput: any
}>

import styles from './style.module.scss'

export const LabelInputGroup: TLabelInputGroup = ({
        label, rules, placeholder, type, propsInput,
}) => {

        return (
                <div className={styles.groupLabelAndInputWrap}>
                        <label>{label} {rules ? <sup>*</sup> : null}</label>
                        <input
                                type={type}
                                placeholder={placeholder}
                                {...propsInput}
                        />
                </div>
        )
}