import { type FC } from 'react'

import styles from './style.module.scss'
import { LinkItem } from './LinkItem'

const ITEMS_SOCIAL_LINK: { value: string, src: string }[] = [
        {
                value: 'google',
                src: '/icons/fill/google.svg',
        },
        {
                value: 'telegram',
                src: '/icons/fill/telegram.svg',
        },
        {
                value: 'apple',
                src: '/icons/fill/apple.svg',
        },
        {
                value: 'vk',
                src: '/icons/fill/vk.svg',
        },
        {
                value: 'yandex',
                src: '/icons/fill/yandex.svg',
        },
]

export const LinksSocial: FC = ({ }) => {
        
        return (
                <footer className={styles.wrapSocial}>
                        {
                                ITEMS_SOCIAL_LINK.map(({ value, src }) => (
                                        <LinkItem
                                                key={value}
                                                src={src}
                                        />
                                ))
                        }
                </footer>
        )
}