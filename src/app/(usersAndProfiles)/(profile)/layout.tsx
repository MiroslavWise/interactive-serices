"use client"

import { ReactNode, useEffect } from "react"
import { isMobile } from "react-device-detect"
import { useRouter } from "next/navigation"

import { NavBarProfile } from "@/components/profile"

import { useAuth } from "@/store/hooks"

import styles from "@/scss/page.module.scss"

export default function LayoutProfile({
  children,
}: {
  children: ReactNode,
}) {
  const { push } = useRouter()
  const { userId } = useAuth()

  useEffect(() => {
    if (userId) {

    } else {
      push("/", undefined)
    }
  }, [userId, push])

  return (
    userId ? (
      <main className={styles.profileLayout}>
        {
          isMobile
            ? children
            : (
              <>
                <NavBarProfile />
                {children}
              </>
            )
        }
      </main>
    ) : null
  )
}