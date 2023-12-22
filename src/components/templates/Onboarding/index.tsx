"use client"

import { cx } from "@/lib/cx"
import { dispatchOnboarding, useOnboarding, useVisibleBannerNewServices } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const Onboarding = () => {
    const step = useOnboarding(({ step }) => step)
    const visible = useOnboarding(({ visible }) => visible)
    const dispatchNewServicesBanner = useVisibleBannerNewServices(({ dispatchNewServicesBanner }) => dispatchNewServicesBanner)

    return (
        <div
            className={cx("wrapper-fixed", styles.wrapper)}
            data-visible={visible}
            data-step={step}
            onClick={() => {
                dispatchNewServicesBanner(true)
                dispatchOnboarding("next")
            }}
        ></div>
    )
}
