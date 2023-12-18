"use client"

import { ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { RULES } from "./constants/rules"
import { POLICY } from "./constants/policy"
import { useTermsOfUse, dispatchClose } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const TermsOfUse = () => {
    const visiblePolicy = useTermsOfUse(({ visiblePolicy }) => visiblePolicy)
    const visibleRules = useTermsOfUse(({ visibleRules }) => visibleRules)

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visiblePolicy || visibleRules}>
            <section>
                <ul>
                    <h2>{visiblePolicy ? "Политика обработки персональных данных" : visibleRules ? "Пользовательское соглашение" : ""}</h2>
                    {(visiblePolicy ? POLICY : visibleRules ? RULES : []).map((item, index) => {
                        if (item.h) return <h3 key={index + "-term::"}>{item.h}</h3>
                        if (item.p) return <p key={index + "-term::"}>{item.p}</p>
                        if (item.i) return <i key={index + "-term::"}>{item.i}</i>
                        return null
                    })}
                </ul>
                <ButtonClose
                    onClick={dispatchClose}
                    position={{
                        top: 12,
                        right: 12,
                    }}
                />
            </section>
        </div>
    )
}
