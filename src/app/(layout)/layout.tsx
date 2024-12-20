import dynamic from "next/dynamic"
import { type PropsWithChildren } from "react"
import { NuqsAdapter } from "nuqs/adapters/next/app"

const NavBarProfile = dynamic(() => import("@/components/layout/NavBar"))

export default ({ children }: PropsWithChildren) => (
  <NuqsAdapter>
    <NavBarProfile />
    {children}
  </NuqsAdapter>
)
