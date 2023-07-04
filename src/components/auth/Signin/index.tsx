"use client"

import { isMobile } from "react-device-detect"
import { type FC, useState, useEffect } from "react"

import type { TTypeSign } from "./SignPopup/types"

import SignPopup from "./SignPopup"
import SignBanner from "./SignBanner"

import { useTokenHelper } from "@/helpers/auth/tokenHelper"

export const Signin: FC = () => {
  const [stateAuth, setStateAuth] = useState<boolean | undefined>(undefined)
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<TTypeSign>("SignIn")

  const handleSignUpOrSignIn = (value: TTypeSign) => {
    setType(value)
    setVisible(true)
  }

  useEffect(() => {
    if (type === "PersonalEntry") {
      setStateAuth(false)
    } else {
      setStateAuth(useTokenHelper.isAuth)
    }
  }, [useTokenHelper.isAuth, type])

  return (
    (!isMobile && !stateAuth && stateAuth !== undefined)
      ? (
        <>
          <SignBanner {...{ handleSignUpOrSignIn }} />
          <SignPopup {...{ visible, type, setVisible, setType }} />
        </>
      ) : null
  )
}