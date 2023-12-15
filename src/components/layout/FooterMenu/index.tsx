"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"

import type { TFooterMenu } from "./types"

import { MENU_ITEMS } from "./constants"
import { useActivePath } from "@/helpers/hooks/useActivePash"
import { useAuth, useModalAuth, dispatchAuthModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const FooterMenu: TFooterMenu = ({}) => {
    const pathname = usePathname()
    const thread = useSearchParams()?.get("thread")
    const isAuth = useAuth(({ isAuth }) => isAuth)
    const visible = useModalAuth(({ visible }) => visible)
    const type = useModalAuth(({ type }) => type)
    const valuePath = useActivePath()

    return (
        <footer className={styles.container} data-not-active={pathname.includes("messages") && !!thread}>
            <nav>
                {MENU_ITEMS(isAuth).map((item) => (
                    <Link
                        key={item.key}
                        href={`/${item.path}` !== pathname && item.path !== null ? { pathname: `/${item.path}` } : {}}
                        onClick={(event) => {
                            event.stopPropagation()
                            if (item.path === null) {
                                dispatchAuthModal({
                                    visible: !visible,
                                    type: ["SignIn", "SignUp"].includes(type!) ? type : "SignIn",
                                })
                            }
                        }}
                    >
                        <div className={styles.itemsIconLabel}>
                            {item.isCenter ? (
                                <div className={styles.centerPoligon} onClick={() => {}}>
                                    <Image
                                        src={valuePath === item.path ? item.icon.fill : item.icon.regular}
                                        alt={item.label}
                                        width={28}
                                        height={28}
                                        unoptimized
                                    />
                                </div>
                            ) : (
                                <Image
                                    src={valuePath === item.path ? item.icon.fill : item.icon.regular}
                                    alt={item.label}
                                    width={24}
                                    height={24}
                                    unoptimized
                                />
                            )}
                            <p>{item.label}</p>
                        </div>
                    </Link>
                ))}
            </nav>
        </footer>
    )
}
