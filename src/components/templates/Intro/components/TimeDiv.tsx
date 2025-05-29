import { useEffect } from "react"

import { dispatchPage, useIntro } from "@/store"

export const TimeDiv = ({ index }: { index: number }) => {
  const page = useIntro(({ page }) => page)

  return <div />
}
