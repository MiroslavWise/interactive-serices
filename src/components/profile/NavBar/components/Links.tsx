"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

import { LINKS_PROFILE } from "./constants"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const Links = () => {
  const { push } = useRouter()
  const active = usePathname()

  return (
    <ul className={styles.linksWrapper}>
      {
        LINKS_PROFILE.map(({ path, label, icon }) => (
          <li
            key={path + "link"}
            onClick={() => push(`${path}`)}
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
  )
}