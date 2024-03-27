"use client"

import Link from "next/link"
import type { TLinkItem } from "../types/types"

import { URL_API } from "@/helpers"

export const LinkItem: TLinkItem = ({ src, path, isActive }) => (
  <Link className="__social_item__" href={isActive ? `${URL_API}${path}` : {}} rel="external">
    <img src={src} alt="icon" data-img width={24} height={24} />
  </Link>
)
