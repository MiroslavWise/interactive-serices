"use client"

import { type ReactNode, useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "react-query"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

import { useAuth } from "@/store/hooks/useAuth"

import { NextThemesProvider } from "@/context/NextThemesProvider"
import { YMapsProvider } from "@/context/YMapsProvider"

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  const { changeAuth } = useAuth()
  const active = usePathname()
  useEffect(() => {
    changeAuth()
  }, [changeAuth])
  return (
    <NextThemesProvider>
      <QueryClientProvider client={queryClient}>
        <YMapsProvider>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={active}
              initial="pageInitial"
              animate="pageAnimate"
              exit="pageExit"
              variants={{
                pageInitial: {
                  opacity: 0
                },
                pageAnimate: {
                  opacity: 1,
                },
                pageExit: {
                  opacity: 0,
                },
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
          <ToastContainer />
        </YMapsProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  )
}