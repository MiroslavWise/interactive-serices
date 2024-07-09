import { type IResponseOffers } from "@/services/offers/types"

import ItemTitle from "../../components/ItemTitle"
import ItemServiceImages from "./ItemServiceImages"
import { NextImageMotion } from "@/components/common"
import ButtonShare, { LinkToMap } from "./ButtonShare"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { fromNow } from "@/helpers"

interface IProps {
  offer: IResponseOffers
}

function ItemServiceData({ offer }: IProps) {
  const { created, user, description, images } = offer ?? {}

  const { firstName, lastName, image } = user ?? {}

  return (
    <>
      <article className="w-full flex flex-col gap-3">
        <section className="w-full flex flex-row items-center justify-between gap-1">
          <time className="text-text-secondary text-start text-xs font-normal" dateTime={created as string}>
            {fromNow(created || new Date())}
          </time>
          <ButtonShare offer={offer} />
        </section>
        <ItemTitle offer={offer} />
        <p className="text-text-primary text-ellipsis text-sm font-normal line-clamp-4">{description}</p>
        <ItemServiceImages images={images} />
      </article>
      <LinkToMap offer={offer} />
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
            {firstName || "Имя"} {lastName || "Фамилия"}
          </p>
        </div>
      </article>
    </>
  )
}

ItemServiceData.displayName = "ItemServiceData"
export default ItemServiceData
