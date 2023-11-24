"use client"

import { useRouter, usePathname } from "next/navigation"

import { useAnimateLoadPage } from "@/store/hooks"
import { useCloseAllModal } from "./useCloseAllModal"

export const usePush = () => {
    const { push, replace, back } = useRouter()
    const pathname = usePathname()
    const { setIsAnimated } = useAnimateLoadPage((_) => ({
        setIsAnimated: _.setIsAnimated,
    }))
    const close = useCloseAllModal()

    function handleReplace(value: string) {
        replace(value)
        close()
        setIsAnimated(false)
    }

    function handlePush(value: string) {
        // close()
        // if (pathname !== value) {
        //     setIsAnimated(true)
        // }
        console.log("push: ----", value)
        push(value)
    }

    function backing() {
        back()
    }

    return { handlePush, handleReplace, backing }
}
