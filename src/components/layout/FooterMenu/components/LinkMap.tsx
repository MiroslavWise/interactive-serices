import Link from "next/link"
import { memo } from "react"
import { usePathname } from "next/navigation"

import { ITEMS_LINK_FOOTER, ITEMS_LINK_ICON } from "../constants"

import styles from "../styles/link.module.scss"

export const LinkMap = memo(function LinkMap() {
    const pathname = usePathname()

    const isActive = pathname === ITEMS_LINK_FOOTER.map

    return (
        <Link href={{ pathname: ITEMS_LINK_FOOTER.map }} data-active={isActive} className={styles.link}>
            <div className={styles.itemsIconLabel}>
                {isActive ? ITEMS_LINK_ICON.map.active : ITEMS_LINK_ICON.map["not-active"]}
                <p>Карта</p>
            </div>
        </Link>
    )
})
