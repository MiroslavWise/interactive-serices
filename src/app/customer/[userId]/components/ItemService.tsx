import Link from "next/link"

import { type IResponseOffers } from "@/services/offers/types"

import ItemTitle from "./ItemTitle"
import ButtonShare from "./ButtonShare"
import ItemServiceImages from "./ItemServiceImages"
import { NextImageMotion } from "@/components/common"
import IconMapWhite from "@/components/icons/IconMapWhite"
import IconArrowRight from "@/components/icons/IconArrowRight"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { fromNow } from "@/helpers"

interface IProps {
  offer: IResponseOffers
}

function ItemService({ offer }: IProps) {
  const { created, addresses, user, description, images } = offer ?? {}

  const firstAddress = addresses[0]

  const additional = firstAddress?.additional?.replace(`${firstAddress?.country}, `, "").replace(`${firstAddress?.district}, `, "") ?? ""

  const { firstName, lastName, image } = user ?? {}

  return (
    <li className="relative w-full px-4 pt-3 pb-4 bg-BG-second rounded-2xl flex flex-col gap-4">
      <article className="w-full flex flex-col gap-3">
        <section className="w-full flex flex-row items-center justify-between gap-1">
          <time className="text-text-secondary text-start text-xs font-normal" dateTime={created as string}>
            {fromNow(created)}
          </time>
          <ButtonShare offer={offer} />
        </section>
        <ItemTitle offer={offer} />
        <p className="text-text-primary text-ellipsis text-sm font-normal line-clamp-4">{description}</p>
        <ItemServiceImages images={images} />
      </article>
      <article className="w-full items-start place-items-start grid grid-cols-[1.5rem_minmax(0,1fr)_1.25rem] gap-2 mt-auto">
        <div className="relative w-6 h-6 p-3 rounded-xl bg-element-accent-1 [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-[0.9rem] [&>svg]:h-[0.9rem]">
          <IconMapWhite />
        </div>
        <p
          className="text-text-primary text-sm text-nowrap whitespace-nowrap text-end font-normal line-clamp-1 text-ellipsis overflow-hidden w-[inherit]"
          title={additional}
          aria-label={additional}
          aria-labelledby={additional}
        >
          {additional}
        </p>
        <Link
          href={{ pathname: "/" }}
          className="w-5 h-5 p-0.625 cursor-pointer relative [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5"
        >
          <IconArrowRight />
        </Link>
      </article>
      <article className="w-full flex flex-row items-center justify-between gap-4 pt-0.625 border-t-[1px] border-solid border-grey-stroke-light">
        <div className="w-full grid grid-cols-[1.5rem_minmax(0,1fr)] gap-0.625 items-center">
          <div
            className={`relative w-6 h-6 p-3 rounded-md overflow-hidden [&>img]:absolute [&>img]:top-1/2 [&>img]:left-1/2 [&>img]:-translate-x-1/2 [&>img]:-translate-y-1/2 [&>img]:w-6 [&>img]:h-6 ${
              !image && "bg-grey-stroke-light !p-1 [&>svg]:w-4 [&>svg]:h-4"
            }`}
          >
            {!!image ? <NextImageMotion src={image?.attributes?.url} alt="avatar" width={100} height={100} /> : <IconEmptyProfile />}
          </div>
          <p className="text-text-primary text-sm font-normal">
            {firstName || "*Имя"} {lastName || "*Фамилия"}
          </p>
        </div>
      </article>
    </li>
  )
}

ItemService.displayName = "ItemService"
export default ItemService
