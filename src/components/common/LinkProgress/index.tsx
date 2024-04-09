"use client"

import { usePathname } from "next/navigation"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react"

type LinkProps = NextLinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & {
    children?: ReactNode
  }

const LinkProgress = forwardRef<HTMLAnchorElement, LinkProps>(function LinkWithRef({ children, ...rest }, ref) {
  return (
    <NextLink {...rest} ref={ref}>
      {children}
    </NextLink>
  )
})

LinkProgress.displayName = "LinkProgress"
export default LinkProgress
