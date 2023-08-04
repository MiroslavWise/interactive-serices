import { type FC } from "react"

import { LinkItem } from "./LinkItem"

import styles from "../../styles/style.module.scss"

const ITEMS_SOCIAL_LINK: { value: string, src: string, path: string }[] = [
  {
    value: "google",
    src: "/icons/fill/google.svg",
    path: "/google/login",
  },
  {
    value: "telegram",
    src: "/icons/fill/telegram.svg",
    path: "/api/auth/signin",
  },
  {
    value: "apple",
    src: "/icons/fill/apple.svg",
    path: "/apple/login",
  },
  {
    value: "vk",
    src: "/icons/fill/vk.svg",
    path: "/vk/login",
  },
  {
    value: "yandex",
    src: "/icons/fill/yandex.svg",
    path: "/yandex/login",
  },
]

export const LinksSocial: FC = ({ }) => {

  return (
    <footer className={styles.wrapSocial}>
      {
        ITEMS_SOCIAL_LINK.map(({ value, src, path }) => (
          <LinkItem
            key={value}
            src={src}
            path={path}
          />
        ))
      }
    </footer>
  )
}