import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { LINKS_PROFILE } from "./constants"

import styles from "../styles/components.module.scss"

export const Links = () => {
    const active = usePathname()

    return (
        <ul className={styles.linksWrapper}>
            {LINKS_PROFILE.map(({ path, label, icon }) => (
                <Link key={path + "link"} data-active={active?.includes(path)} href={path!}>
                    <Image src={icon} alt={icon} width={24} height={24} unoptimized />
                    <p>{label}</p>
                    {/* {path === "/notifications" ? (
                        <div
                            data-notification
                            onClick={(event) => {
                                event.stopPropagation()
                                event.preventDefault()
                            }}
                            onMouseLeave={() => {
                            }}
                        >
                            <ul>
                                <h6>Нет новых уведомлений</h6>
                                <h6>Просмотренные</h6>
                            </ul>
                        </div>
                    ) : null} */}
                </Link>
            ))}
        </ul>
    )
}
