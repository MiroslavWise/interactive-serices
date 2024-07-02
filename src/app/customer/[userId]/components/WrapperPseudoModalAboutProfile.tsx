"use client"

import { ReactNode } from "react"

import { useCustomerAbout } from "@/store"

function WrapperPseudoModalAboutProfile({ children }: { children: ReactNode }) {
  const visible = useCustomerAbout(({ visible }) => visible)

  return (
    <div
      className={`fixed inset-0 bg-translucent opacity-0 -z-10 invisible w-full h-full flex flex-col items-center max-md:justify-end md:pt-[5.625rem] md:px-6 ${
        visible && "!visible !opacity-100 !z-[1000]"
      }`}
    >
      {children}
    </div>
  )
}

WrapperPseudoModalAboutProfile.displayName = "WrapperPseudoModalAboutProfile"
export default WrapperPseudoModalAboutProfile
