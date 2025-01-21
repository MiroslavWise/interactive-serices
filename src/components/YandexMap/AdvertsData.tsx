import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, type SetStateAction, Dispatch, useState } from "react"

import { type IImageData } from "@/types/type"
import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type ICompany } from "@/services/types/company"
import { type IResponseOffers } from "@/services/offers/types"
import { type IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { NextImageMotion } from "../common"
import IconRating from "../icons/IconRating"
import AdvertButtons from "../common/Card/AdvertButtons"

import { cx } from "@/lib/cx"
import { getTestimonials } from "@/services"
import { useOutsideClickEvent } from "@/helpers"
import { DeclensionAllQuantityFeedback } from "@/lib/declension"
import { dispatchBallonAlert, dispatchBallonOffer, dispatchBallonPost } from "@/store"

interface IProps {
  isOpen: boolean
  title: string
  description: string
  image?: IImageData
  address: IAddressesResponse
  provider: EnumTypeProvider
  setIsOpen: Dispatch<SetStateAction<boolean>>
  company: ICompany

  offer?: IResponseOffers
  post?: IPosts
}

function AdvertsData({ provider, isOpen, setIsOpen, title, image, address, company, offer, post }: IProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [isOpenCompany, setIsOpenCompany, refCompany] = useOutsideClickEvent()
  const addressName = address?.additional ?? ""
  const { title: companyTitle, erid: companyErid, inn: companyInn, ad } = company ?? {}

  const targetId = provider === EnumTypeProvider.POST ? post?.id : offer?.id
  const description =
    provider === EnumTypeProvider.POST ? post?.notes?.find((_) => _.main)?.description ?? null : offer?.description ?? null

  const { data: testimonials } = useQuery({
    queryFn: () => getTestimonials({ target: targetId!, provider: provider, order: "DESC" }),
    queryKey: ["testimonials", provider, targetId],
    enabled: !!targetId && isOpen,
  })

  const list = testimonials?.data ?? []
  const length = list.length
  const rating = (list.reduce((acc, item) => acc + item.rating, 0) / (length || 1)).toFixed(1)
  const countText = DeclensionAllQuantityFeedback(length)

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
          <h2 className="text-text-primary text-sm font-semibold line-clamp-2 text-ellipsis cursor-pointer" onClick={handle}>
            {title}
          </h2>
          {length > 0 ? (
            <div className="flex flex-row items-center gap-1">
              <div className="w-min flex flex-row items-center">
                <div className="relative w-4 h-4 *:w-2.5 *:h-2.5">
                  <IconRating />
                </div>
                <span className="whitespace-nowrap text-text-accent text-xs">{rating}</span>
              </div>
              <span className="text-text-secondary text-xs">{countText}</span>
            </div>
          ) : (
            <span className="text-text-secondary text-xs font-light whitespace-nowrap">Ещё нет отзывов</span>
          )}
        </div>
        <div className={cx("rounded-md overflow-hidden w-10 h-10 cursor-pointer", image ? "relative" : "hidden")} onClick={handle}>
          {image ? (
            <NextImageMotion
              src={image.attributes.url}
              hash={image.attributes.blur}
              alt={provider}
              width={80}
              height={80}
              className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
            />
          ) : null}
        </div>
      </header>
      <p className="text-text-secondary text-xs font-normal line-clamp-3 text-ellipsis cursor-pointer" onClick={handle}>
        {addressName}
      </p>
      <p className={cx(!!ad && "text-text-primary text-xs font-normal line-clamp-4")}>{description}</p>
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
      <AdvertButtons provider={provider} offer={offer} post={post} />
    </article>
  )
}

AdvertsData.displayName = "AdvertsData"
export default AdvertsData
