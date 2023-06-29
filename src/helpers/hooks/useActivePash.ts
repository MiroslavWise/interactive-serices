import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export const useActivePash = () => {
  const [path, setPath] = useState("")
  const active = usePathname()

  useEffect(() => {
    const split = active?.split("/")?.[0]
    setPath(split)
  }, [active])

  return path
}