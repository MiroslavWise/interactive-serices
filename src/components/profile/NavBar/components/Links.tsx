"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { cx } from "@/lib/cx"
import { LINKS_PROFILE } from "./constants"

import styles from "./styles/style.module.scss"

export const Links = () => {
    const active = usePathname()

    return (
        <ul className={styles.linksWrapper}>
            {LINKS_PROFILE.map(({ path, label, icon }) => (
                <Link key={path + "link"} className={cx(active?.includes(path) && styles.active, styles.item)} href={path!}>
                    <Image src={icon} alt={icon} width={24} height={24} unoptimized />
                    <p>{label}</p>
                </Link>
            ))}
        </ul>
    )
}
