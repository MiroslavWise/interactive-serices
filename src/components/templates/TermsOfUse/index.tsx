"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"

import { ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { RULES } from "./constants/rules"
import { POLICY } from "./constants/policy"
import { useTermsOfUse } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const TermsOfUse = () => {
    const visiblePolicy = useTermsOfUse(({ visiblePolicy }) => visiblePolicy)
    const visibleRules = useTermsOfUse(({ visibleRules }) => visibleRules)
    const dispatchPolicy = useTermsOfUse(({ dispatchPolicy }) => dispatchPolicy)
    const dispatchRules = useTermsOfUse(({ dispatchRules }) => dispatchRules)

    const h = useMemo(() => {
        if (visiblePolicy) return "Политика обработки персональных данных"
        if (visibleRules) return "Пользовательское соглашение"
        return null
    }, [visiblePolicy, visibleRules])

    const CONST = useMemo(() => {
        if (visiblePolicy) return POLICY
        if (visibleRules) return RULES

        return []
    }, [visiblePolicy, visibleRules])

    return (
        <div
            className={cx("wrapper-fixed", styles.wrapper)}
            data-mobile={isMobile}
            data-visible={visiblePolicy || visibleRules}
        >
            <section>
                <ul>
                    <h2>{h}</h2>
                    {CONST.map((item) => {
                        if (item.h) return <h3>{item.h}</h3>
                        if (item.p) return <p>{item.p}</p>
                        if (item.i) return <i>{item.i}</i>
                        return null
                    })}
                </ul>
                <ButtonClose
                    onClick={() => {
                        dispatchPolicy({ visible: false })
                        dispatchRules({ visible: false })
                    }}
                    position={{
                        top: 12,
                        right: 12,
                    }}
                />
            </section>
        </div>
    )
}
