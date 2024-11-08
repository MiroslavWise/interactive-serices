import dynamic from "next/dynamic"

import { type PropsWithChildren, type ReactNode } from "react"

const ClientLayout = dynamic(() => import("./components/ClientLayout"))

export default ({ children, profile }: PropsWithChildren<{ profile: ReactNode }>) => (
  <ClientLayout>
    {children}
    {profile}
  </ClientLayout>
)
