import dynamic from "next/dynamic"
import { type PropsWithChildren } from "react"

const NavBarProfile = dynamic(() => import("@/components/layout/NavBar"))
const DrawerMenuMain = dynamic(() => import("@/components/templates/DrawerMenuMain"))

export default ({ children }: PropsWithChildren) => (
  <>
    <NavBarProfile />
    {children}
    <DrawerMenuMain />
  </>
)
