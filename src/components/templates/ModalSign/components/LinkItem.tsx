import Link from "next/link"

import type { TLinkItem } from "../types/types"

import { URL_API } from "@/helpers"
import { dispatchCloseModalAuth } from "@/store"

export const LinkItem: TLinkItem = ({ src, path, isActive }) => (
  <Link
    className="flex items-center justify-center p-2.5 rounded-[6.25rem] h-11 w-[3.4375rem] shadow-social-link bg-BG-icons cursor-pointer"
    href={isActive ? (path.includes("https") ? path : `${URL_API}${path}`) : {}}
    onClick={() => {
      if (path.includes("/vk")) {
        dispatchCloseModalAuth()
      }
    }}
    rel="external"
    prefetch={false}
  >
    <img className="w-6 h-6 object-cover" src={src} alt="icon" width={24} height={24} />
  </Link>
)
