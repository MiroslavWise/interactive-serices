import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

import type { ISegmentValues } from 'types/general'
import type { TProfilePublicModule } from './types'

import { InfoContainerProfile } from './components/InfoContainerProfile'
import { ItemsBadges } from './components/ItemsBadges'
import { ItemSegments } from './components/ItemSegments'

import styles from './style.module.scss'
import { ContainerReviews } from './components/ContainerReviews'

const VALUES: ISegmentValues[] = [
        {
                value: 'reviews',
                label: 'Отзывы',
        },
        {
                value: 'offers',
                label: 'Предложения',
        },
        {
                value: 'requests',
                label: 'Запросы',
        },
        {
                value: 'blogs',
                label: 'Блоги',
        },
]

const ProfilePublicModule: TProfilePublicModule = ({ active, profile, setActive }) => {
        const [activeSegment, setActiveSegment] = useState<ISegmentValues>(VALUES[0])

        return (
                <motion.div
                        className={`${styles.container} ${active ? styles.active : ''}`}
                >
                        <InfoContainerProfile />
                        <ItemsBadges />
                        <ItemSegments
                                values={VALUES}
                                activeSegment={activeSegment}
                                setActiveSegment={setActiveSegment}
                        />
                        <ContainerReviews />
                        <p className={styles.title}>Public profile</p>
                        <div
                                className={styles.close}
                                onClick={() => setActive({ isProfile: false, isService: true, dataProfile: null })}
                        >
                                <Image
                                        src="/svg/x-close.svg"
                                        alt='x'
                                        width={14}
                                        height={14}
                                />
                        </div>
                        <div className={styles.dots}>
                                <Image
                                        src="/svg/dots-vertical.svg"
                                        alt='dots'
                                        width={14}
                                        height={14}
                                />
                        </div>
                        <span className={styles.glassShadow1} />
                        <span className={styles.glassShadow2} />
                        <span className={styles.glassShadow3} />
                        <span className={styles.glassShadow4} />
                        <span className={styles.glassShadow5} />
                </motion.div>
        )
}

export default ProfilePublicModule