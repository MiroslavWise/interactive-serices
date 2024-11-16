"use client"

import env from "@/config/environment"
import { useToast } from "./useToast"
import { useResize } from "./use-resize.hook"

interface IProps {
  url: string
  title: string
}

export const useNavigator = ({ url, title }: IProps) => {
  const { onSimpleMessage } = useToast()
  const { isTablet } = useResize()

  function onShare() {
    const fullUrl = `${env.server.host}${url}`

    if (isTablet && !!window.navigator.share) {
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
