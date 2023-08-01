import { type ReactNode } from "react"

import { NewServicesBanner } from "@/components/profile"

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <>
      {children}
      <NewServicesBanner />
    </>
  )
}