"use client"

import { motion } from "framer-motion"

import { Buttons } from "./components/Buttons"
import { Links } from "./components/Links"
import { Logo } from "./components/Logo"

import styles from "./styles/style.module.scss"

export const NavBarUser = () => {

  return (
    <motion.nav
      className={styles.nav}
      initial={{ top: -70 }}
      animate={{ top: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ top: -70 }}
    >
      <Logo />
      <Buttons />
    </motion.nav>
  )
}

export const NavBarProfile = () => {

  return (
    <motion.nav
      className={styles.nav}
      initial={{ top: -70 }}
      animate={{ top: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ top: -70 }}
    >
      <Logo />
      <Links />
      <Buttons />
    </motion.nav>
  )
}