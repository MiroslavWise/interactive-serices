import { useState } from "react"
import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

import type { TContentSelectVerification } from "./types/types"

import { ButtonSelection } from "./components/ButtonSelection"

import { cx } from "@/lib/cx"

import styles from "../styles/style.module.scss"

export const ContentSelectVerification: TContentSelectVerification = ({ setType, typeVerification, setTypeVerification }) => {
  const handleVerification = async (value: "phone" | "email") => {
    setTypeVerification(value)
  }

  return (
    <motion.div
      className={cx(styles.contentRow, isMobile && styles.isMobile)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ButtonSelection
        active={typeVerification === "phone"}
        onClick={() => handleVerification("phone")}
        label="Telegram номер"
        image="/svg/telegram_selection.svg"
      />
      <ButtonSelection
        active={typeVerification === "email"}
        onClick={() => handleVerification("email")}
        label="Email адрес"
        image="/svg/email_selection.svg"
      />
    </motion.div>
  )
}