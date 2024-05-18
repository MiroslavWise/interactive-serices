"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { usePush } from "@/helpers"
import { dispatchUTMData, dispatchAuthModal, type IStateUTM } from "@/store"

export default () => {
  const searchParams = useSearchParams()

  const utm_source = searchParams.get("utm_source")
  const utm_medium = searchParams.get("utm_medium")
  const utm_campaign = searchParams.get("utm_campaign")
  const utm_content = searchParams.get("utm_content")

  const { handlePush } = usePush()

  useEffect(() => {
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

      if (Object.values(data).length) {
        dispatchUTMData(data)
      }
      dispatchAuthModal({ visible: true, type: "SignUp" })
      handlePush("/")
    })
  }, [])

  return null
}
