"use client"

import { PropsWithChildren } from "react"

import { IImageData } from "@/types/type"
import { EnumTypeProvider } from "@/types/enum"
import { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import AdvertsData from "./AdvertsData"

import { useOutsideClickEvent } from "@/helpers"

interface IProps {
  isAdvertising: boolean
  provider: EnumTypeProvider
  title: string
  description: string
  address: IAddressesResponse
  images: IImageData[]
}

function DivMarker({ children, isAdvertising, provider, title, images, description, address }: PropsWithChildren<IProps>) {
  const [isOpen, setIsOpen, ref] = useOutsideClickEvent()

  return (
    <div
      onClick={(event) => {
        event.stopPropagation()
        setIsOpen(true)
      }}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 max-md:scale-75 group w-[2.1875rem] h-[2.5625rem]"
      ref={ref}
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
        />
      )}
      {children}
    </div>
  )
}

DivMarker.displayName = "DivMarker"
export default DivMarker
