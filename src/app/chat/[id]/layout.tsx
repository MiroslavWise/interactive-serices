import { type ReactNode } from "react"

import ClientLayout from "./components/ClientLayout"

export default ({ children, profile }: { children: ReactNode; profile: ReactNode }) => (
  <ClientLayout>
    {children}
    {profile}
  </ClientLayout>
)
