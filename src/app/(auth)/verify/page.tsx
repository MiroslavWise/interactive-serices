"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { usePush } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { RegistrationService } from "@/services/auth/registrationService"
import { dispatchAuthModal, dispatchOnboarding } from "@/store"

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
                    dispatchOnboarding("open")
                    dispatchAuthModal({
                        visible: true,
                        type: "SignIn",
                    })
                    handlePush("/")
                } else {
                    on({
                        message: "Ваш аккаунт не прошёл верификацию.",
                    })
                    handlePush("/")
                }
            })
        }
    }, [verifyToken])

    return null
}
