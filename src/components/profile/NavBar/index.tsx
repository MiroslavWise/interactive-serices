"use client"

import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

import { Buttons } from "./components/Buttons"
import { Links } from "./components/Links"
import { Logo } from "./components/Logo"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const NavBarUser = () => {

  return (
    typeof isMobile !== "undefined" && !isMobile
      ? (
        <motion.nav
          className={cx(styles.nav)}
          initial={{ top: -70 }}
          animate={{ top: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ top: -70 }}
        >
          <Logo />
          <Buttons />
        </motion.nav>
      ) : null
  )
}

export const NavBarProfile = () => {
  return (
    typeof isMobile !== "undefined" && !isMobile
      ? (
        <motion.nav
          className={cx(styles.nav)}
          initial={{ top: -70 }}
          animate={{ top: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ top: -70 }}
        >
          <Logo />
          <Links />
          <Buttons />
        </motion.nav>
      ) : null

  )
}