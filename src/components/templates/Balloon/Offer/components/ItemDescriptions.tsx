// import { useQuery } from "@tanstack/react-query"

import { type IResponseOffers } from "@/services/offers/types"

import ItemImages from "./ItemImages"
// import { ImageCategory } from "@/components/common"
// import IconRepeat from "@/components/icons/IconRepeat"

// import { getOffersCategories } from "@/services"

function ItemDescriptions({ offer }: { offer: IResponseOffers }) {
  const { description: proposal, images = [], category } = offer ?? {}

  // const { data: c } = useQuery({
  //   queryFn: () => getOffersCategories(),
  //   queryKey: ["categories"],
  // })
  // const categories = c?.data || []

  // const categoriesOffer = useMemo(
  //   () => categories?.filter((item) => offer?.categories?.some((_) => item.id === _)) || [],
  //   [categories, offer?.categories],
  // )

  return (
    <article className="h-fit w-full flex flex-col gap-3 relative overflow-x-hidden overflow-y-auto">
      <b className="text-text-primary text-base text-start font-medium">{category?.title ?? ""}</b>
      <p className="w-full text-text-primary text-sm font-normal -mt-1.5 whitespace-pre-wrap">{proposal}</p>
      {images?.length > 0 ? <ItemImages images={images} /> : null}
      {/* {categoriesOffer?.length > 0 ? (
        <section className="flex flex-col -mt-0.5 gap-0">
          <div className="w-full flex justify-center items-center *:w-5 *:h-5">
            <IconRepeat />
          </div>
          <h4 className="text-text-primary text-left text-base font-medium">В обмен</h4>
          <div className="w-full flex flex-wrap gap-2 pt-2">
            {categoriesOffer.map((item) => (
              <a
                key={`::${item.id}::wants::`}
                className="h-9 rounded-[1.125rem] px-2 py-1.5 flex flex-row items-center gap-1 bg-BG-icons border border-solid border-grey-stroke-light"
              >
                <div className="w-6 h-6 p-1 *:w-4 *:h-4">
                  <ImageCategory id={item.id!} slug={item?.slug} provider={item?.provider} />
                </div>
                <span className="text-text-primary text-sm font-normal line-clamp-1 text-ellipsis">{item.title || ""}</span>
              </a>
            ))}
          </div>
        </section>
      ) : null} */}
    </article>
  )
}

ItemDescriptions.displayName = "ItemDescriptions"
export default ItemDescriptions
