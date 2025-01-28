"use client"

import { useQueryState } from "nuqs"
import { useRouter } from "next/navigation"
import { type DispatchWithoutAction, useEffect } from "react"

import { EnumSign } from "@/types/enum"

import { clg } from "@console"
import { dispatchAuthModal, dispatchUTMData, type IStateUTM } from "@/store"

type TTypeAction = "login" | "registration"

const dispatch: Record<TTypeAction, DispatchWithoutAction> = {
  login() {
    dispatchAuthModal({ visible: true, type: EnumSign.SignIn })
  },
  registration() {
    dispatchAuthModal({ visible: true, type: EnumSign.SignUp })
  },
}

const useUtm = (stringReplace?: string, action?: TTypeAction) => {
  const [utm_source] = useQueryState("utm_source")
  const [utm_medium] = useQueryState("utm_medium")
  const [utm_campaign] = useQueryState("utm_campaign")
  const [utm_content] = useQueryState("utm_content")

  const { push } = useRouter()

  clg("useUtm: stringReplace", stringReplace)
  clg("useUtm: action", action)

  useEffect(() => {
    if (utm_source || utm_medium || utm_campaign || utm_content) {
      const data: IStateUTM = {}

      if (utm_source) {
        data.utm_source = utm_source
      }
      if (utm_medium) {
        data.utm_medium = utm_medium
      }
      if (utm_campaign) {
        data.utm_campaign = utm_campaign
      }
      if (utm_content) {
        data.utm_content = utm_content
      }

      if (Object.values(data).length > 0) {
        dispatchUTMData(data)
      }
    }
    if (action) {
      dispatch[action]()
    }
    requestAnimationFrame(() => {
      if (stringReplace) {
        push(stringReplace)
      } else {
        push("/")
      }
    })
  }, [])
}

export default useUtm
