'use client'

import { type FC, useState } from 'react'
import Image from 'next/image'

import type { TSingModulePopup, TTypeSing } from './types'

import { HeaderModal } from './components/HeaderModal'
import { ContentSingUp } from './components/ContentSingUp'
import { ContentSingIn } from './components/ContentSingIn'

import styles from './style.module.scss'

export const SingModulePopup: TSingModulePopup = ({ }) => {
        const [visible, setVisible] = useState(false)
        const [type, setType] = useState<TTypeSing>('SingIn')
        return (
                <div className={styles.overlay}>
                        <div className={styles.modal}>
                                <div className={styles.close}>
                                        <Image
                                                src="/svg/x-close.svg"
                                                alt='x'
                                                width={14}
                                                height={14}
                                        />
                                </div>
                                <div className={styles.content}>
                                        <HeaderModal type={type} />
                                        {
                                                type === "SingUp" ? <ContentSingUp setType={setType} /> : null
                                        }
                                        {
                                                type === "SingIn" ? <ContentSingIn setType={setType} /> : null
                                        }
                                </div>
                                <div className={styles.orangeCircle} />
                                <div className={styles.purpleCircle} />
                                <div className={styles.lightBlueCircle} />
                        </div>
                </div>
        )
}