"use client"

import { PropsWithChildren, useState } from "react"

import { type IImageData } from "@/types/type"
import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type ICompany } from "@/services/types/company"
import { type IResponseOffers } from "@/services/offers/types"
import { type IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import AdvertsData from "./AdvertsData"
import { IconSprite } from "../icons/icon-sprite"

import { cx } from "@/lib/cx"
import { formatOfMMM } from "@/helpers/functions/daysAgo"

interface IProps {
  isAdvertising: boolean
  provider: EnumTypeProvider
  title: string
  description: string
  address: IAddressesResponse
  image?: IImageData
  company: ICompany
  /** @deprecated
   * offer
   * post
   */
  offer?: IResponseOffers
  post?: IPosts
}

function DivMarker({
  children,
  isAdvertising,
  provider,
  title,
  image,
  description,
  address,
  company,
  offer,
  post,
}: PropsWithChildren<IProps>) {
  const [isOpen, setIsOpen] = useState(false)

  const urgent = provider === EnumTypeProvider.POST ? !!post?.urgent : !!offer?.urgent
  const created = provider === EnumTypeProvider.POST ? post?.updated ?? post?.created : offer?.updated ?? offer?.created

  return (
    <div
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={cx(
        "absolute z-30 -translate-x-1/2 -translate-y-1/2 max-md:scale-75 group",
        isAdvertising ? "w-[2.1875rem] h-[2.1875rem]" : "w-[2.1875rem] h-[2.5625rem]",
      )}
    >
      {isAdvertising && (
        <AdvertsData
          provider={provider}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={title}
          image={image}
          description={description}
          address={address}
          company={company}
          /** @deprecated
           * offer
           * post
           */
          offer={offer}
          post={post}
        />
      )}
      {children}
      {urgent ? (
        <div
          className={cx(
            "-z-[1] [background:var(--more-red-gradient)] rounded-r-md py-1.5 pr-2.5 pl-6 grid-cols-[1rem_minmax(0,1fr)] gap-2 items-center absolute w-max max-w- left-0 top-1/2 pointer-events-none -translate-y-1/2",
            isAdvertising ? "translate-x-5 grid" : "translate-x-3.5 hidden invisible group-hover:grid group-hover:visible",
          )}
        >
          <div className="w-4 h-4 relative p-2">
            <IconSprite id="category-heart-white" className="w-4 h-4" />
          </div>
          <span className="text-xs text-text-button font-medium line-clamp-1 text-ellipsis">{title ?? "Щедрое сердце"}</span>
        </div>
      ) : (
        <div
          className={cx(
            "flex div-alert-text bg-text-button absolute w-max left-0 top-1/2 -translate-y-1/2",
            isAdvertising ? "translate-x-5" : "translate-x-3.5 hidden invisible group-hover:grid group-hover:visible",
          )}
        >
          <section className="flex flex-col h-min">
            <p className="text-[#000] line-clamp-1 text-ellipsis text-sm font-medium">{title}</p>
            <time className="text-text-secondary text-[0.8125rem] line-clamp-1 text-ellipsis font-normal leading-4">
              {formatOfMMM(created ?? "")}
            </time>
          </section>
        </div>
      )}
    </div>
  )
}

DivMarker.displayName = "DivMarker"
export default DivMarker
