import { type Dispatch, type SetStateAction } from "react"

import { type IImageData } from "@/types/type"
import { EnumTypeProvider } from "@/types/enum"

import { NextImageMotion } from "../common"
import { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { cx } from "@/lib/cx"

interface IProps {
  isOpen: boolean
  title: string
  description: string
  images: IImageData[]
  address: IAddressesResponse
  provider: EnumTypeProvider
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

function AdvertsData({ provider, isOpen, setIsOpen, title, images, description, address }: IProps) {
  if (!isOpen) return null

  const image = images.length > 0 ? images[0] : null

  const addressName = address?.additional ?? ""

  return (
    <article
      className={cx(
        "absolute z-20 top-0 left-0 -translate-y-full rounded-2xl flex flex-col gap-2 p-3 w-56",
        provider === EnumTypeProvider.offer && "bg-BG-second",
        provider === EnumTypeProvider.alert && "bg-card-red",
        provider === EnumTypeProvider.POST && "bg-card-yellow",
      )}
    >
      <header className={cx("w-full grid grid-cols-[minmax(0,1fr)_2.5rem] gap-3 items-start")}>
        <div className="w-full flex flex-col items-start justify-between">
          <h2 className="text-text-primary text-sm font-medium line-clamp-2 text-ellipsis">{title}</h2>
        </div>
        <div className="rounded-md">
          {image ? <NextImageMotion src={image.attributes.url} hash={image.attributes.blur} alt={provider} /> : null}
        </div>
      </header>
      <p className="text-text-secondary text-xs font-normal line-clamp-3 text-ellipsis">{addressName}</p>
      <p className="text-text-primary text-xs font-normal line-clamp-4">{description}</p>
    </article>
  )
}

AdvertsData.displayName = "AdvertsData"
export default AdvertsData
