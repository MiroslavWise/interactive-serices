"use client"

import Link from "next/link"

import { TLinkManager } from "../utils/constants"
import { cx } from "@/lib/cx"
import { usePathname } from "next/navigation"

interface IProps {
  label: string
  path: TLinkManager
}

function ItemLinkMenu({ path, label }: IProps) {
  const pathname = usePathname()

  const is = pathname.includes(path)

  return (
    <Link href={{ pathname: path }}>
      <span className={cx("text-sm font-medium transition-colors", is ? "text-text-accent" : "text-text-primary")}>{label}</span>
    </Link>
  )
}

ItemLinkMenu.displayName = "ItemLinkMenu"
export default ItemLinkMenu
