"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { isMobile } from "react-device-detect"

import { useChat } from "@/store/hooks"
import { cx } from "@/lib/cx"
import { LINKS_PROFILE } from "./constants"

import styles from "./styles/style.module.scss"

export const Links = () => {
  const { push } = useRouter()
  const active = usePathname()
  const { currentChatId } = useChat()

  return (
    !isMobile ? (
      <ul className={styles.linksWrapper}>
        {
          LINKS_PROFILE.map(({ path, label, icon }) => (
            <li
              key={path + "link"}
              onClick={() => {
                if (path === "/messages" && currentChatId) {
                  push(`${path}?user=${currentChatId}`)
                  return
                }
                push(`${path}`)
              }}
              className={cx(active.includes(path) && styles.active)}
            >
              <Image
                src={icon}
                alt={icon}
                width={24}
                height={24}
              />
              <a>{label}</a>
            </li>
          ))
        }
      </ul>
    ) : null
  )
}