import { useEffect, useRef, type Dispatch, type SetStateAction } from "react"

import { type IImageData } from "@/types/type"
import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type ICompany } from "@/services/types/company"
import { type IResponseOffers } from "@/services/offers/types"
import { type IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { NextImageMotion } from "../common"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { dispatchBallonAlert, dispatchBallonOffer, dispatchBallonPost, useAuth } from "@/store"

interface IProps {
  isOpen: boolean
  title: string
  description: string
  images: IImageData[]
  address: IAddressesResponse
  provider: EnumTypeProvider
  setIsOpen: Dispatch<SetStateAction<boolean>>
  company: ICompany

  offer?: IResponseOffers
  post?: IPosts
}

function AdvertsData({ provider, isOpen, setIsOpen, title, images, description, address, company, offer, post }: IProps) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const ref = useRef<HTMLDivElement>(null)
  const [isOpenCompany, setIsOpenCompany, refCompany] = useOutsideClickEvent()
  const image = images.length > 0 ? images[0] : null
  const addressName = address?.additional ?? ""

  const { title: companyTitle, erid: companyErid, inn: companyInn } = company ?? {}

  useEffect(() => {
    if (isOpen) {
      if (ref.current) {
        function handleClickOutside(event: MouseEvent) {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen(false)
          }
        }

        document.addEventListener("click", handleClickOutside)

        return () => document.removeEventListener("click", handleClickOutside)
      }
    }
  }, [isOpen])

  function handle(event: any) {
    event.stopPropagation()
    setIsOpen(false)

    if (provider === EnumTypeProvider.offer) {
      dispatchBallonOffer({ offer: offer! })
      return
    }
    if (provider === EnumTypeProvider.alert) {
      dispatchBallonAlert({ offer: offer! })
      return
    }
    if (provider === EnumTypeProvider.POST) {
      dispatchBallonPost(post!)
      return
    }
  }

  const isParticipants = provider === EnumTypeProvider.POST && post?.isParticipants

  return (
    <article
      className={cx(
        isOpen ? "flex" : "hidden",
        "absolute z-30 top-0 left-0 -translate-y-full rounded-2xl flex-col gap-2 p-3 w-80 shadow-md",
        provider === EnumTypeProvider.offer && "bg-BG-second",
        provider === EnumTypeProvider.alert && "bg-card-red",
        provider === EnumTypeProvider.POST && "bg-card-yellow",
      )}
      ref={ref}
    >
      <header className={cx("w-full grid gap-3 items-start", image ? "grid-cols-[minmax(0,1fr)_2.5rem]" : "grid-cols-[minmax(0,1fr)]")}>
        <div className="w-full flex flex-col items-start justify-between gap-1">
          <h2 className="text-text-primary text-sm font-medium line-clamp-2 text-ellipsis cursor-pointer" onClick={handle}>
            {title}
          </h2>
          <span className="text-text-secondary text-xs font-light whitespace-nowrap">Ещё нет отзывов</span>
        </div>
        <div className={cx("rounded-md overflow-hidden w-10 h-10 cursor-pointer", image ? "relative" : "hidden")} onClick={handle}>
          {image ? (
            <NextImageMotion
              src={image.attributes.url}
              hash={image.attributes.blur}
              alt={provider}
              className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
            />
          ) : null}
        </div>
      </header>
      <p className="text-text-secondary text-xs font-normal line-clamp-3 text-ellipsis cursor-pointer" onClick={handle}>
        {addressName}
      </p>
      <p className="text-text-primary text-xs font-normal line-clamp-4">{description}</p>
      <span
        className="relative text-[0.625rem] font-light text-text-disabled cursor-pointer -mt-1 w-fit"
        ref={refCompany}
        onClick={(event) => {
          event.stopPropagation()
          setIsOpenCompany((_) => !_)
        }}
      >
        Реклама
        <div
          className={cx(
            "py-3 px-2 flex flex-col gap-1 rounded-sm absolute z-20 top-full right-0 shadow-sm min-w-32 max-w-fit bg-BG-second transition-all duration-200",
            isOpenCompany ? "opacity-100 visible" : "opacity-0 invisible",
          )}
        >
          <span className="text-text-primary text-xs font-medium">{companyTitle}</span>
          <span className="text-text-primary text-xs font-medium whitespace-nowrap">ИНН: {companyInn}</span>
          <span className="text-text-primary text-xs font-normal whitespace-nowrap">erid: {companyErid}</span>
        </div>
      </span>
      <footer className="flex flex-row items-center justify-start gap-2"></footer>
    </article>
  )
}

AdvertsData.displayName = "AdvertsData"
export default AdvertsData
