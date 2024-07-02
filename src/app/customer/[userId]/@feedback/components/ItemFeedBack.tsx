import Link from "next/link"

import { type IResponseTestimonials } from "@/services/testimonials/types"

import ItemOffer from "./ItemOffer"
import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { formatOfMMM } from "@/helpers"
import { EnumTypeProvider } from "@/types/enum"
import DescriptionItemFeedback from "./DescriptionItemFeedback"

async function ItemFeedBack(props: IResponseTestimonials) {
  const { rating, id, message, created, targetId, user, provider } = props ?? {}

  const { image, firstName, lastName } = user ?? {}

  return (
    <div className="py-4 flex flex-col gap-3 border-b-[1px] border-solid border-grey-stroke-light last:!border-none">
      <article className="w-full grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
        <Link
          className={`w-full relative flex items-center cursor-pointer justify-center aspect-square overflow-hidden rounded-[0.625rem] [&>img]:w-full [&>img]:h-full ${
            !image && "bg-grey-stroke-light !p-2 [&>svg]:w-6 [&>svg]:h-6"
          }`}
          href={{ pathname: `/customer/${user.id}` }}
        >
          {!!image ? <NextImageMotion src={image?.attributes?.url} alt="avatar" width={40} height={40} /> : <IconEmptyProfile />}
        </Link>
        <div className="w-full flex flex-col gap-1 justify-between items-start">
          <div className="w-full flex flex-row items-center gap-1">
            <p className=" text-text-primary text-sm font-medium line-clamp-1 overflow-ellipsis">
              {firstName || ""} {lastName || ""}
            </p>
            <div className="w-5 h-5 flex items-center justify-center p-[0.0625rem]">
              <IconVerifiedTick />
            </div>
          </div>
          {provider === EnumTypeProvider.offer && targetId ? <ItemOffer idOffer={targetId} /> : null}
        </div>
      </article>
      <article className="w-full flex flex-col gap-1">
        <div className="w-full flex flex-row items-center gap-1">
          <article className="flex flex-row items-center gap-0.125 flex-nowrap">
            {[1, 2, 3, 4, 5].map((rate) => (
              <div key={`::key::rate::${rate}::${id}::`} className="p-0.039rem flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M5.99903 0.625C6.52366 0.625 6.93692 1.02127 7.20075 1.55596L8.08176 3.33258C8.10847 3.38756 8.17181 3.46499 8.26701 3.53582C8.36211 3.60657 8.45525 3.64561 8.51652 3.6559L10.1113 3.92306C10.6874 4.01987 11.1703 4.30225 11.327 4.79395C11.4836 5.28525 11.2542 5.7958 10.8399 6.21082L10.8395 6.21123L9.60053 7.46043C9.55143 7.50994 9.49642 7.60321 9.46192 7.72472C9.42766 7.84541 9.42462 7.95534 9.44016 8.02637L9.44037 8.02736L9.79484 9.57269C9.94185 10.2159 9.89314 10.8537 9.43952 11.1871C8.98433 11.5217 8.36232 11.3734 7.79724 11.0368L6.30225 10.1445C6.23948 10.107 6.13166 10.0766 6.00152 10.0766C5.87234 10.0766 5.76226 10.1066 5.6954 10.1455L5.69445 10.146L4.20242 11.0366C3.638 11.3743 3.01675 11.52 2.56153 11.1851C2.10822 10.8516 2.05705 10.215 2.20453 9.57236L2.55893 8.02736L2.55914 8.02637C2.57468 7.95534 2.57164 7.84541 2.53738 7.72472C2.50288 7.60321 2.44787 7.50994 2.39876 7.46043L1.1589 6.21032C0.7473 5.79532 0.51858 5.2852 0.67395 4.79463C0.829773 4.30262 1.31169 4.0199 1.88814 3.92303L3.48164 3.6561L3.48214 3.65601C3.54056 3.64587 3.63233 3.60728 3.72721 3.53634C3.82228 3.46527 3.88577 3.38768 3.91254 3.33258L3.91388 3.32983L4.79379 1.55549L4.79414 1.55479C5.06046 1.02054 5.47499 0.625 5.99903 0.625Z"
                    fill={rating >= rate ? "#FEA032" : "var(--grey-separator)"}
                  />
                </svg>
              </div>
            ))}
          </article>
          <time
            title={`Время создания: ${created}`}
            dateTime={created as unknown as string}
            className="text-text-secondary text-[0.8125rem] font-normal"
          >
            {formatOfMMM(created).replace(".", "")}
          </time>
        </div>
        <DescriptionItemFeedback message={message} />
      </article>
    </div>
  )
}

ItemFeedBack.displayName = "ItemFeedBack"
export default ItemFeedBack
