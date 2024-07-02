import Link from "next/link"
import Image from "next/image"

import type { TDots } from "../types/types"

import { useCloseAllModal } from "@/helpers/hooks/useCloseAllModal"

export const BlockDots: TDots = ({ id }) => {
  const close = useCloseAllModal()

  return (
    <div data-block-dots>
      <Link href={{ pathname: `/customer/${id}` }} onClick={close}>
        <Image src="/svg/maximize.svg" alt="max" width={28} height={28} unoptimized />
      </Link>
      <Image src="/svg/dots-vertical-gray.svg" alt="max" width={28} height={28} unoptimized />
    </div>
  )
}
