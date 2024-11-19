"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { type DispatchWithoutAction, useEffect } from "react"

import { EnumSign } from "@/types/enum"

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
  const searchParams = useSearchParams()
  const { replace, push } = useRouter()

  const utm_source = searchParams.get("utm_source")
  const utm_medium = searchParams.get("utm_medium")
  const utm_campaign = searchParams.get("utm_campaign")
  const utm_content = searchParams.get("utm_content")

  useEffect(() => {
    if (utm_source || utm_medium || utm_campaign || utm_content) {
      setTimeout(() => {
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
          if (action) {
            dispatch[action]()
          }
          if (stringReplace) {
            push(stringReplace)
          } else {
            replace("/")
          }
        }
      })
    }
  }, [])
}

export default useUtm
