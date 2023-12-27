"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { LINKS_PROFILE } from "./constants"

import styles from "../styles/components.module.scss"

export const Links = () => {
    const pathname = usePathname()

    return (
        <ul className={styles.linksWrapper}>
            {LINKS_PROFILE.map(({ path, label, icon }) => (
                <Link key={path + "link"} data-active={pathname?.includes(path)} href={{ pathname: path }}>
                    <img src={icon} alt={icon} width={24} height={24} />
                    <span>{label}</span>
                </Link>
            ))}
        </ul>
    )
}
