"use client"

import { PropsWithChildren, useState } from "react"

import { type IImageData } from "@/types/type"
import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type ICompany } from "@/services/types/company"
import { type IResponseOffers } from "@/services/offers/types"
import { type IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import AdvertsData from "./AdvertsData"

import { cx } from "@/lib/cx"

interface IProps {
  isAdvertising: boolean
  provider: EnumTypeProvider
  title: string
  description: string
  address: IAddressesResponse
  images: IImageData[]
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
  images,
  description,
  address,
  company,
  offer,
  post,
}: PropsWithChildren<IProps>) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      onClick={(event) => {
        event.stopPropagation()
        setIsOpen(true)
      }}
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
          images={images}
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
    </div>
  )
}

DivMarker.displayName = "DivMarker"
export default DivMarker
