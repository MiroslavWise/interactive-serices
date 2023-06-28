"use client"

import { type FC, useState } from "react"

import type { TTypeSign } from "./SignPopup/types"

import SignPopup  from "./SignPopup"
import SignBanner from "./SignBanner"

export const Signin: FC = () => {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<TTypeSign>("SignIn")

  const handleSignUpOrSignIn = (value: TTypeSign) => {
    setType(value)
    setVisible(true)
  }

  return (
    <>
      <SignBanner {...{ handleSignUpOrSignIn }} />
      <SignPopup {...{ visible, type, setVisible, setType }} />
    </>
  )
}