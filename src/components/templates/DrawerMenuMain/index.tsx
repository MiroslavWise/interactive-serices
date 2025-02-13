"use client"

import Link from "next/link"
import { Logo } from "@/components/layout/NavBar/components/Logo"
import ButtonOpenDrawer from "@/components/layout/NavBar/components/ButtonOpenDrawer"

import { cx } from "@/lib/cx"
import { dispatchCloseDrawer, useOpenDrawer } from "@/store"

interface ILink {
  pathname: string
  label: string
}

const LINKS: ILink[] = [
  {
    pathname: "/ads",
    label: "Реклама",
  },
  {
    pathname: "https://t.me/sheirainfo",
    label: "Обратная связь",
  },
  {
    pathname: "/legal/privacy-policy",
    label: "Политика конфиденциальности",
  },
  {
    pathname: "/legal/terms",
    label: "Правила пользования",
  },
]

function DrawerMenuMain() {
  const open = useOpenDrawer(({ visible }) => visible)

  return (
    <>
      <div
        className={cx(
          "w-full h-full inset-0 fixed bg-translucent transition-all hidden md:flex",
          open ? "z-[998] opacity-100 visible" : "-z-10  opacity-0 invisible",
        )}
        onClick={dispatchCloseDrawer}
      />
      <div
        className={cx(
          "flex flex-col h-full fixed top-0 right-0 bottom-0 w-full md:w-80 bg-BG-second z-[999] transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="w-full flex items-center h-[var(--height-header-nav-bar)] justify-between px-6 [&>button]:max-md:aspect-square [&>button]:max-md:px-0 [&>a]:opacity-0">
          <Logo />
          <ButtonOpenDrawer type="sprite-nav-header-burger-menu-x" />
        </div>
        <div className="w-full h-[calc(100%_-_var(--height-header-nav-bar))] px-6 py-6 flex flex-col">
          <ul className="w-full flex flex-col">
            {LINKS.map(({ pathname, label }) => (
              <Link
                className="text-text-primary text-base font-normal p-1 hover:opacity-85"
                href={pathname}
                target="_blank"
                key={`vc;d=-e0rw-${pathname}`}
              >
                {label}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

DrawerMenuMain.displayName = "DrawerMenuMain"
export default DrawerMenuMain
