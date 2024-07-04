import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { IResponseOffers } from "@/services/offers/types"

import ItemImages from "./ItemImages"
import { ImageCategory } from "@/components/common"
import IconRepeat from "@/components/icons/IconRepeat"

import { cx } from "@/lib/cx"
import { getOffersCategories } from "@/services"

export const ItemDescriptions = memo(function ItemProposal({ offer }: { offer: IResponseOffers }) {
  const proposal = offer?.description
  const images = offer?.images || []
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.res || []

  const categoriesOffer = useMemo(() => {
    return categories?.filter((item) => offer?.categories?.some((_) => item.id === _)) || []
  }, [categories, offer?.categories])

  return (
    <article className="h-fit w-full flex flex-col gap-3 relative overflow-x-hidden overflow-y-auto">
      <b className="text-text-primary text-base text-start font-medium">Предложение</b>
      <p className="w-full text-text-primary text-sm font-normal -mt-0.375">{proposal}</p>
      {images?.length > 0 ? <ItemImages images={images} /> : null}
      {categoriesOffer?.length > 0 ? (
        <section className="flex flex-col -mt-0.125 gap-0">
          <div className="w-full flex justify-center items-center [&>svg]:w-5 [&>svg]:h-5">
            <IconRepeat />
          </div>
          <h4 className="text-text-primary text-left text-base font-medium">В обмен</h4>
          <div className="w-full flex flex-wrap gap-2 pt-2">
            {categoriesOffer.map((item) => (
              <a
                key={`::${item.id}::wants::`}
                className="h-9 rounded-[1.125rem] px-2 py-0.375 flex flex-row items-center gap-1 bg-BG-icons border-[1px] border-solid border-grey-stroke-light"
              >
                <div className="w-6 h-6 p-1 [&>img]:w-4 [&>img]:h-4">
                  <ImageCategory id={item.id!} />
                </div>
                <span className="text-text-primary text-sm font-normal line-clamp-1 text-ellipsis">{item.title || ""}</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
})
