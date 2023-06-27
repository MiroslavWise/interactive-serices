'use client'

import { useState } from "react"

import type { IStateVisible } from "./types"

import ServiceBanner from "./ServiceBanner"
import ProfilePublicModule from "./ProfilePublic"

export const ModuleProfile = ({ }) => {
        const [serviceDataVisible, setServiceDataVisible] = useState<IStateVisible>({
                isService: true,
                isProfile: false,
                dataProfile: null,
        })
        
        return (
                <>
                        <ServiceBanner
                                active={serviceDataVisible.isService}
                                setDataAndActive={setServiceDataVisible}
                        />
                        <ProfilePublicModule
                                active={serviceDataVisible.isProfile}
                                profile={serviceDataVisible.dataProfile}
                                setActive={setServiceDataVisible}
                        />
                </>
        )
}