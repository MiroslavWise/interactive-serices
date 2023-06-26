import { type FC } from 'react'
import Image from 'next/image'

import styles from './style.module.scss'

type TLinkItem = FC<{
        src: string
}>

export const LinkItem: TLinkItem = ({src }) => {
        
        return (
                <div className={styles.itemLink}>
                        <Image
                                src={src}
                                alt={src}
                                height={24}
                                width={24}
                        />
                </div>
        )
}