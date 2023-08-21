"use client"

import { type ReactNode, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "react-query"
import { useSearchParams } from "next/navigation"
import { toast } from "react-toastify"

// import { NextThemesProvider } from "@/context/NextThemesProvider"
import { YMapsProvider } from "@/context/YMapsProvider"

import { useAuth } from "@/store/hooks/useAuth"
import { RegistrationService } from "@/services/auth/registrationService"
import { useVisibleAndTypeAuthModal } from "@/store/hooks"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: false,
    }
  }
})

export default function Providers({ children }: { children: ReactNode }) {
  const { changeAuth } = useAuth()
  const searchParams = useSearchParams()
  const verifyToken = searchParams.get("verify")
  const passwordResetToken = searchParams.get("password-reset-token")
  const { setVisibleAndType } = useVisibleAndTypeAuthModal()
  const onSuccess = (value: string) => toast(value, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
  useEffect(() => {
    changeAuth()
  }, [changeAuth])
  useEffect(() => {
    if (passwordResetToken) {
      setVisibleAndType({
        visible: true,
        type: "ResetPassword",
      })
    }
  }, [passwordResetToken, setVisibleAndType])
  useEffect(() => {
    if (verifyToken) {
      RegistrationService.verification({ code: verifyToken! })
        .then(response => {
          if (response.ok) {
            onSuccess("Ваш аккаунт успешно прошёл верификацию. Теперь вы можете войти на аккаунт.")
          }
        })
    }
  }, [verifyToken])

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude

        console.log("latitude: ", latitude)
        console.log("longitude: ", longitude)
        console.log("position: ", position)
      }, error => {
        console.error("Ошибка геолокации: ", error.message)
      })
    } else {
      console.error("Геолокация недоступна в данном браузере.")
    }
  }, [])

  return (
    // <NextThemesProvider>
    <QueryClientProvider client={queryClient}>
      <YMapsProvider>
        {children}
        <ToastContainer />
      </YMapsProvider>
    </QueryClientProvider>
    // </NextThemesProvider>
  )
}