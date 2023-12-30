"use client"

import { useEffect } from "react"
import { usePush } from "@/helpers"

import { useSearchParams } from "next/navigation"
import { dispatchAuthModalResetPassword } from "@/store/hooks"

export default function PageResetPassword() {
    const { handlePush } = usePush()
    const passwordResetToken = useSearchParams()?.get("token")

    useEffect(() => {
        if (passwordResetToken) {
            dispatchAuthModalResetPassword(passwordResetToken!)
            handlePush("/")
        }
    }, [passwordResetToken])

    return null
}
