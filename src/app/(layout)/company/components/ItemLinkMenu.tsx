"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cx } from "@/lib/cx"
import { ILink } from "../utils/constants"

interface IProps extends ILink {}

function ItemLinkMenu({ path, label }: IProps) {
  const pathname = usePathname()

  const is = path === "/company" ? pathname === "/company" : pathname.includes(path)

  return (
    <Link href={{ pathname: path }}>
      <span className={cx("text-sm font-medium transition-colors", is ? "text-text-accent" : "text-text-primary")}>{label}</span>
    </Link>
  )
}

ItemLinkMenu.displayName = "ItemLinkMenu"
export default ItemLinkMenu
