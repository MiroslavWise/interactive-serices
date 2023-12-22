"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import type { TFooterMenu } from "./types"

import { MENU_ITEMS } from "./constants"
import { useActivePath } from "@/helpers/hooks/useActivePash"
import { useAuth, useModalAuth, dispatchAuthModal, dispatchNewServicesBanner } from "@/store/hooks"

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
                        href={item.path !== null ? { pathname: `/${item.path}` } : {}}
                        onClick={(event) => {
                            event.stopPropagation()
                            if (item.path === null && !isAuth) {
                                dispatchAuthModal({
                                    visible: !visible,
                                    type: ["SignIn", "SignUp"].includes(type!) ? type : "SignIn",
                                })
                            } else if (item.isCenter && isAuth) {
                                dispatchNewServicesBanner(true)
                            }
                        }}
                        data-active={pathname === `/${item.path}`}
                    >
                        <div className={styles.itemsIconLabel}>
                            {item.isCenter ? (
                                <div className={styles.centerPoligon}>
                                    <img src={item.icon.fill} alt={item.label} width={20} height={20} />
                                </div>
                            ) : (
                                <img
                                    src={valuePath === item.path ? item.icon.fill : item.icon.regular}
                                    alt={item.label}
                                    width={24}
                                    height={24}
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
