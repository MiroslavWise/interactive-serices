"use client"

import { isMobile, isTablet } from "react-device-detect"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"

import type { TFooterMenu } from "./types"

import { useActivePath } from "@/helpers/hooks/useActivePash"
import { MENU_ITEMS } from "./constants"

import { useAuth, useVisibleAndTypeAuthModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const FooterMenu: TFooterMenu = ({ }) => {
  const { push } = useRouter()
  const { visible, type, setVisibleAndType } = useVisibleAndTypeAuthModal()
  const { isAuth } = useAuth()
  const valuePath = useActivePath()

  const handleSignInOrSignUp = () => {
    setVisibleAndType({ visible: !visible, type: type ? type : "SignIn" })
  }

  const handleGoToPage = (path: string) => {
    push(`/${path}`)
  }

  return (
    (isMobile && !isTablet) ? (
      <>
        <motion.footer
          className={styles.container}
          initial={{ bottom: -70 }}
          animate={{ bottom: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ bottom: -70 }}
        >
          <ul>
            {
              MENU_ITEMS(isAuth).map(item => (
                <li
                  key={`${item.path}_item_menu`}
                  onClick={() => {
                    if (item.path !== null) {
                      handleGoToPage(item.path)
                    }
                    if (item.path === null && item.isCenter) {
                      handleSignInOrSignUp()
                    }
                  }}
                >
                  <div className={styles.itemsIconLabel}>
                    {
                      item.isCenter
                        ? (
                          <div className={styles.centerPoligon}>
                            <Image
                              src={valuePath === item.path ? item.icon.fill : item.icon.regular}
                              alt={item.label}
                              width={28}
                              height={28}
                            />
                          </div>
                        ) : (
                          <Image
                            src={valuePath === item.path ? item.icon.fill : item.icon.regular}
                            alt={item.label}
                            width={24}
                            height={24}
                          />
                        )
                    }
                    <p>{item.label}</p>
                  </div>
                </li>
              ))
            }
          </ul>
        </motion.footer>
      </>
    ) : null
  )
}