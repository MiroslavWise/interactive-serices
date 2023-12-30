"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { usePush } from "@/helpers"
import { dispatchAuthModal } from "@/store/hooks"
import { useToast } from "@/helpers/hooks/useToast"
import { RegistrationService } from "@/services/auth/registrationService"

export default function PageVerify() {
    const verifyToken = useSearchParams()?.get("token")
    const { on } = useToast()
    const { handlePush } = usePush()

    useEffect(() => {
        if (verifyToken) {
            RegistrationService.verification({ code: verifyToken! }).then((response) => {
                if (response.ok) {
                    on({
                        message: "Ваш аккаунт успешно прошёл верификацию. Теперь вы можете войти на аккаунт.",
                    })
                    handlePush("/")
                    dispatchAuthModal({
                        visible: true,
                        type: "SignIn",
                    })
                }
            })
        }
    }, [verifyToken])

    return null
}
