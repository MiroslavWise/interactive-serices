"use client"

import { isMobile } from "react-device-detect"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import type { TFooterMenu } from "./types"

import { useActivePash } from "@/helpers/hooks/useActivePash"
import { MENU_ITEMS } from "./constants"

import styles from "./styles/style.module.scss"
import Image from "next/image"

export const FooterMenu: TFooterMenu = ({ }) => {
  const valuePath = useActivePash()
  // const { push } = useRouter()

  const handleSignInOrSignUp = () => {
  }

  const handleGoToPage = (path: string) => {
    // push(`/${path}`)
  }

  return (
    isMobile ? (
      <motion.footer
        className={styles.container}
        initial={{ bottom: -70 }}
        animate={{ bottom: 0 }}
        transition={{ type: "just" }}
        exit={{ bottom: -70 }}
      >
        <ul>
          {
            MENU_ITEMS(false).map(item => (
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
    ) : null
  )
}