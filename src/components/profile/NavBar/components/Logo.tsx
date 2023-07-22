"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export const Logo = () => {
  const { push } = useRouter()
  return (
    <Image
      src="/logo/wordmark.svg"
      alt="logo"
      width={117}
      height={30}
      onClick={() => push("/")}
      className="cursor-pointer"
    />
  )
}