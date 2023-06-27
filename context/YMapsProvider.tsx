'use client'

import { YMaps } from '@pbe/react-yandex-maps'
import { type ReactNode } from 'react'



export const YMapsProvider = ({ children }: { children: ReactNode }) => {
        
        return (
                <YMaps>
                        {children}
                </YMaps>
        )
}