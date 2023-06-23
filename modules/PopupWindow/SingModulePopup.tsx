'use client'

import { type FC, useState } from 'react'
import Image from 'next/image'

import { HeaderModal } from './components/HeaderModal'
import { ContentSingModal } from './components/ContentSingModal'

import styles from './style.module.scss'

type TSingModulePopup = FC<{}>

export const SingModulePopup: TSingModulePopup = ({ }) => {
        const [visible, setVisible] = useState(false)
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
                                        <HeaderModal />
                                        <ContentSingModal />
                                </div>
                                <div className={styles.orangeCircle} />
                                <div className={styles.purpleCircle} />
                                <div className={styles.lightBlueCircle} />
                        </div>
                </div>
        )
}