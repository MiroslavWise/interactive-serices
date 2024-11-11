"use client"

import env from "@/config/environment"
import { useToast } from "./useToast"

interface IProps {
  url: string
  title: string
}

export const useNavigator = ({ url, title }: IProps) => {
  const { onSimpleMessage } = useToast()

  function onShare() {
    const fullUrl = `${env.server.host}${url}`
    const platform = /macos/.test(navigator?.userAgent?.toLowerCase())

    if (!!window.navigator.share || !platform) {
      navigator.share({
        title: title,
        url: url,
      })
    } else {
      navigator.clipboard.writeText(fullUrl)
      onSimpleMessage("Ссылка скопирована")
    }
  }

  return onShare
}
