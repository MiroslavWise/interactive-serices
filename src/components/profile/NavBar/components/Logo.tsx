"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"



export const Logo = () => {
  const { push } = useRouter()
  return (
    <Image
      src="/logo/wordmark.svg"
      alt="logo"
      width={117}
      height={30}
      className="cursor-pointer"
      onClick={() => push("/")}
    />
  )
}