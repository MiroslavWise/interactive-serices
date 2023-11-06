"use client"

import { useRouter, usePathname } from "next/navigation"

import { useAnimateLoadPage } from "@/store/hooks"

export const usePush = () => {
    const { push, replace, back } = useRouter()
    const pathname = usePathname()
    const { setIsAnimated } = useAnimateLoadPage()

    function handleReplace(value: string) {
        replace(value)
        setIsAnimated(false)
    }

    function handlePush(value: string) {
        if (!value.includes(pathname) && value !== "/") {
            setIsAnimated(true)
        }
        push(value)
    }

    function backing() {
        back()
    }

    return { handlePush, handleReplace, backing }
}
