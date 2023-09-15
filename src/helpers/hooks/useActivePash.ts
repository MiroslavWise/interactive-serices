import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export const useActivePath = () => {
    const [path, setPath] = useState("")
    const active = usePathname()

    useEffect(() => {
        const split = active?.split("/")?.filter((_) => _)?.[0]
        setPath(split || "")
    }, [active])

    return path
}
