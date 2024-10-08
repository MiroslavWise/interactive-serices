import dynamic from "next/dynamic"

import { Logo } from "./components/Logo"
const FooterMenu = dynamic(() => import("../FooterMenu"))
const MobileHeader = dynamic(() => import("../MobileHeader"))
const Links = dynamic(() => import("./components/Links").then((res) => res.Links))
const Buttons = dynamic(() => import("./components/Buttons").then((res) => res.Buttons))

export default function NavBarProfile() {
  return (
    <>
      <nav className="fixed w-full top-0 left-0 right-0 h-[var(--height-header-nav-bar)] py-0 px-[3.25rem] hidden md:flex items-center justify-between z-[70] bg-[var(--BG-second)]">
        <Logo />
        <Links />
        <Buttons />
      </nav>
      <MobileHeader />
      <FooterMenu />
    </>
  )
}
