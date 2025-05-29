import Link from "next/link"

export const Logo = () => (
  <Link href={"/"} className="cursor-pointer w-[7.3125rem] h-[1.875rem]" prefetch>
    <img src="/logo/wordmark.svg" className="w-[7.3125rem] h-[1.875rem]" alt="logo" width={117} height={30} />
  </Link>
)
