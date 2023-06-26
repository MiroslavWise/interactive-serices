'use client'

import { type FC, useState } from 'react'

import SingModulePopup from 'modules/SingModulePopup'
import BannerSing from 'modules/ClassBanner/BannerSing'
import { TTypeSing } from 'modules/SingModulePopup/types'

export const ComponentSing: FC = () => {
        const [visible, setVisible] = useState(false)
        const [type, setType] = useState<TTypeSing>('SingIn')

        const handleSignUpOrSignIn = (value: TTypeSing) => {
                setType(value)
                setVisible(true)
        }

        return (
                <>
                        <BannerSing {...{handleSignUpOrSignIn}} />
                        <SingModulePopup {...{ visible, type, setVisible, setType }} />
                </>
        )
}