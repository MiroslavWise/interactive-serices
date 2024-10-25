import { type IResponseOffers } from "@/services/offers/types"

import Avatar from "@avatar"
import ItemTitle from "../../components/ItemTitle"
import IconHelp from "@/components/icons/IconHelp"
import ItemServiceImages from "./ItemServiceImages"
import ButtonShare, { LinkToMap } from "./ButtonShare"

import { cx } from "@/lib/cx"
import { fromNow } from "@/helpers"

interface IProps {
  offer: IResponseOffers
}

function ItemServiceData({ offer }: IProps) {
  const { created, user, description, images, urgent } = offer ?? {}

  const { firstName, lastName = "", image } = user ?? {}

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
        <span className="text-text-button text-xs font-medium">Безвозмездная помощь</span>
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
        <article className="w-full flex flex-row items-center justify-between gap-4 pt-2.5 border-t border-solid border-grey-stroke-light">
          <div className="w-full grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2.5 items-center">
            <Avatar className="w-6 h-6 rounded-md p-3" image={image} />
            <p className="text-text-primary text-sm font-normal">
              {firstName || "Имя"} {lastName}
            </p>
          </div>
        </article>
      </section>
    </>
  )
}

ItemServiceData.displayName = "ItemServiceData"
export default ItemServiceData
