import { ImageCategory } from "@/components/common"

import { useReciprocalExchange } from "@/store"

export const ItemOffer = () => {
  const offer = useReciprocalExchange(({ offer }) => offer)

  return (
    <div className="w-full rounded-[0.625rem] border border-solid border-grey-stroke-light p-2 flex flex-col gap-1 items-start">
      <div className="w-fit max-w-full p-1 pr-1.5 grid grid-cols-[1.5rem_minmax(0,1fr)] gap-1 items-center bg-grey-field rounded-2xl h-8">
        <div className="w-6 h-6 p-3 rounded-full bg-BG-icons relative *:absolute *:top-1/2 *:left-1/2 *:w-4 *:h-4 *:-translate-x-1/2 *:-translate-y-1/2">
          <ImageCategory id={offer?.categoryId!} slug={offer?.category?.slug} provider={offer?.category?.provider} />
        </div>
        <span className="text-text-primary line-clamp-1 whitespace-nowrap text-sm font-normal text-ellipsis">{offer?.category?.title}</span>
      </div>
      <p className="text-text-primary text-sm text-left font-normal">{offer?.description}</p>
    </div>
  )
}
