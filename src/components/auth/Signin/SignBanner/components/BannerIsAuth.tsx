"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { FooterAsideLeft } from "@/components/profile/LeftAsideProfile/components/Footer"
import { HeaderBlock } from "@/components/profile/BlockProfileAside/components/HeaderBlock"
import { BadgeAchievements, BadgeGradient } from "@/components/common/Badge"

import { useAuth, useVisibleAndTypeAuthModal } from "@/store/hooks"

import { BADGES } from "@/mocks/components/auth/constants"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const BannerIsAuth = () => {
  const { push } = useRouter()
  const { profileId } = useAuth()
  const { setVisibleAndType } = useVisibleAndTypeAuthModal()

  return (
    <motion.ul
      id="SignBanner"
      className={cx(styles.containerAuthBanner)}
      initial={{ left: -300, opacity: 0, visibility: "hidden", }}
      animate={{ left: 24, opacity: 1, visibility: "visible", }}
      transition={{ duration: 0.5, }}
      exit={{ left: -300, opacity: 0, visibility: "hidden", }}
    >
      <section className={styles.contentProfile}>
        <HeaderBlock />
        <ul className={styles.badges}>
          {
            BADGES.slice(1, 3).map(item => (
              <BadgeAchievements
                classNames={[styles.badge]}
                key={`${item.title}_is_auth_banner`}
                title={item.title}
                total={item.total}
                type={item.rating_movement}
              />
            ))
          }
        </ul>
        {
          !profileId ? (
            <BadgeGradient
              coins={2450}
              handleClick={() => setVisibleAndType({ visible: true, type: "PersonalEntry" })}
              type="optional-2"
              about="Заработайте 500+ монет для успешных обменов."
            />
          ) : null
        }
        <ButtonFill
          label="Профиль"
          classNames={cx("w-100", styles.largeButton)}
          handleClick={() => { push(`/profile`) }}
        />
        <ButtonDefault
          label={profileId ? "Редактировать профиль" : "Создать профиль"}
          classNames={cx("w-100", styles.largeButton)}
          handleClick={() => setVisibleAndType({ visible: true, type: "PersonalEntry" })}
        />
      </section>
      <FooterAsideLeft />
    </motion.ul>
  )
}