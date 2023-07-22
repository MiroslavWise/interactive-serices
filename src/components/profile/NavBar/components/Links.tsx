"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { LINKS_PROFILE } from "./constants"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"
import { useActivePath } from "@/helpers/hooks/useActivePash"

export const Links = () => {
  const { push } = useRouter()
  const valuePath = useActivePath()

  return (
    <ul className={styles.linksWrapper}>
      {
        LINKS_PROFILE.map(({ path, label, icon }) => (
          <li
            key={path + "link"}
            onClick={() => push(path)}
            className={cx(valuePath === path.replace("/", "") && styles.active)}
          >
            <Image
              src={icon}
              alt={icon}
              width={24}
              height={24}
            />
            <a>{ label}</a>
          </li>
        ))
      }
    </ul>
  )
}