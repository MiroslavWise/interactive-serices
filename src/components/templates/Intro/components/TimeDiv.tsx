import { useEffect } from "react"

import { dispatchPage, useIntro } from "@/store"

export const TimeDiv = ({ index }: { index: number }) => {
  const page = useIntro(({ page }) => page)

  useEffect(() => {
    if (page === index) {
      const time = setTimeout(() => {
        console.log("setTimeout: start: page: ", page, "index: ", index)
        dispatchPage()
      }, 10 * 1000 - 1)
      return () => clearTimeout(time)
    }
  }, [page, index])

  return <div />
}
