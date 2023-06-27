"use client"

import { type FC, useState } from "react"

import type { TTypeSing } from "./SingModulePopup/types"
import SingModulePopup from "./SingModulePopup"
import BannerSing from "./BannerSign"

export const ComponentSing: FC = () => {
        const [visible, setVisible] = useState(false)
        const [type, setType] = useState<TTypeSing>("SingIn")

        const handleSignUpOrSignIn = (value: TTypeSing) => {
                setType(value)
                setVisible(true)
        }

        return (
                <>
                        <BannerSing {...{ handleSignUpOrSignIn }} />
                        <SingModulePopup {...{ visible, type, setVisible, setType }} />
                </>
        )
}