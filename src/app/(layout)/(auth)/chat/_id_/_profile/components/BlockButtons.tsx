import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { type IUserResponse } from "@/services/users/types"

import { ImageCategory } from "@/components/common"

import { cx } from "@/lib/cx"
import { nameTitle } from "@/lib/names"
import { getFiendId, getOffers } from "@/services"

function BlockButtons({ user }: { user: IUserResponse }) {
  const { data: dataFriends } = useQuery({
    queryFn: () => getFiendId(user?.id!),
    queryKey: ["friends", { user: user?.id! }],
    enabled: !!user?.id,
  })

  const { data: dataOffers } = useQuery({
    queryFn: () => getOffers({ provider: EnumTypeProvider.offer, order: "DESC", user: user?.id! }),
    queryKey: ["offers", { userId: user?.id, provider: EnumTypeProvider.offer }],
    enabled: !!user?.id!,
  })

  const itemsOffers = dataOffers?.data || []
  const items = dataFriends?.data || []
  const length = items.length

  return (
    <div className={cx("w-full py-2.5 flex flex-col")}>
      <article className="w-full flex flex-row items-center justify-between py-2 border-y border-solid border-grey-stroke-light">
        <p className="text-text-primary text-sm py-1.5 text-left font-medium">{length} друзей</p>
        <div className="flex flex-row items-center flex-nowrap pr-1.5 justify-end"></div>
      </article>
      <article className="w-full flex flex-row items-center justify-between py-2 border-b border-solid border-grey-stroke-light">
        <p className="text-text-primary text-sm py-1.5 text-left font-medium">
          {itemsOffers.length} {nameTitle(itemsOffers.length, EnumTypeProvider.offer)}
        </p>
        <div className="flex flex-row items-center flex-nowrap pr-1.5 justify-end">
          {itemsOffers.slice(0, 6).map((item, index) => (
            <a
              key={`::key::item::pre::offer::${item.id}::`}
              className="w-8 h-8 rounded-full bg-BG-second !-mr-1.5 flex items-center justify-center p-0.5"
              style={{
                zIndex: 10 + index,
              }}
              title={item.title}
              aria-label={item.title}
              aria-labelledby={item.title}
            >
              <section
                className={cx(
                  "w-7 h-7 rounded-full bg-grey-field p-3.5 relative",
                  "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5",
                )}
              >
                <ImageCategory id={item.categoryId!} slug={item?.category?.slug} provider={item?.category?.provider} />
              </section>
            </a>
          ))}
        </div>
      </article>
    </div>
  )
}

BlockButtons.displayName = "BlockButtons"
export default BlockButtons
