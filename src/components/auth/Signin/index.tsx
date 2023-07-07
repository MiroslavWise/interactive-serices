"use client"

import dynamic from 'next/dynamic'
import { isMobile } from "react-device-detect"
import { type FC, useState, useEffect } from "react"

import type { TTypeSign } from "./SignPopup/types"

const SignPopup = dynamic(() => import("./SignPopup"))
import SignBanner from "./SignBanner"

import { AuthService } from '@/services/auth/authService'
import { useAuth } from "@/store/hooks/useAuth"

export const Signin: FC = () => {
  const { isAuth } = useAuth()
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<TTypeSign>("SignIn")

  const handleSignUpOrSignIn = (value: TTypeSign) => {
    setType(value)
    setVisible(true)
  }

  useEffect(() => {
    setTimeout(() => {
      console.log("asf: ", AuthService.authToken(), AuthService.authRefreshToken())
    }, 100)
  }, [isAuth])

  return (
    (!isMobile)
      ? (
        <>
          <SignBanner {...{ handleSignUpOrSignIn }} />
          <SignPopup {...{ visible, type, setVisible, setType }} />
        </>
      ) : null
  )
}