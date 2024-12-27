import dynamic from "next/dynamic"
import { type PropsWithChildren } from "react"

const NavBarProfile = dynamic(() => import("@/components/layout/NavBar"))

export default ({ children }: PropsWithChildren) => (
  <>
    <NavBarProfile />
    {children}
  </>
)
