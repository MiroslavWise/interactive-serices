"use client"

import { useRouter, usePathname } from "next/navigation"

import { dispatchAnimated } from "@/store/hooks"
import { useCloseAllModal } from "./useCloseAllModal"

export const usePush = () => {
    const { push, replace, back } = useRouter()
    const pathname = usePathname()
    const close = useCloseAllModal()

    function handleReplace(value: string) {
        replace(value)
        close()
        dispatchAnimated(false)
    }

    function handlePush(value: string) {
        if (pathname !== value) {
            dispatchAnimated(true)
            close()
        }
        push(value, { scroll: false })
    }

    function backing() {
        back()
    }

    return { handlePush, handleReplace, backing }
}
