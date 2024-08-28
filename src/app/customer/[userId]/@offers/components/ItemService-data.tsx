import { type IResponseOffers } from "@/services/offers/types"

import ItemTitle from "../../components/ItemTitle"
import ItemServiceImages from "./ItemServiceImages"
import { NextImageMotion } from "@/components/common"
import ButtonShare, { LinkToMap } from "./ButtonShare"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { fromNow } from "@/helpers"
import { cx } from "@/lib/cx"
import IconHelp from "@/components/icons/IconHelp"

interface IProps {
  offer: IResponseOffers
}

function ItemServiceData({ offer }: IProps) {
  const { created, user, description, images, urgent } = offer ?? {}

  const { firstName, lastName, image } = user ?? {}

  return (
    <>
      <article
        className={cx(
          "w-full [background:var(--more-red-gradient)] flex-row items-center justify-center gap-2 py-1.5 px-2.5",
          !!urgent ? "flex" : "hidden",
        )}
      >
        <div className="w-4 h-4 relative">
          <IconHelp />
        </div>
        <span className="text-text-button text-xs font-medium">Помощь Курску</span>
      </article>
      <section className="w-full px-4 pt-3 pb-4 flex flex-col gap-4">
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
      </section>
    </>
  )
}

ItemServiceData.displayName = "ItemServiceData"
export default ItemServiceData
