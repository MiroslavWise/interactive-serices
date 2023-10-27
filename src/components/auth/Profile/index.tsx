"use client"

import { useState } from "react"
import { isMobile, isTablet } from "react-device-detect"

import type { IStateVisible } from "./types"

import { ProfilePublic } from "./ProfilePublic"

export const Profiles = ({}) => {
    const [serviceDataVisible, setServiceDataVisible] = useState<IStateVisible>(
        {
            isService: true,
            isProfile: false,
            dataProfile: null,
        },
    )

    return !isMobile || isTablet ? (
        <>
            <ProfilePublic
                active={serviceDataVisible}
                setActive={setServiceDataVisible}
            />
        </>
    ) : null
}
