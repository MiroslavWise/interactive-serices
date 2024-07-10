import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { type IUserResponse } from "@/services/users/types"

import { ImageCategory, NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { cx } from "@/lib/cx"
import { getFiendId, getUserIdOffers } from "@/services"
import { nameTitle } from "@/app/customer/[userId]/@offers/page"

function BlockButtons({ user }: { user: IUserResponse }) {
  const { data: dataFriends } = useQuery({
    queryFn: () => getFiendId(user?.id!),
    queryKey: ["friends", { user: user?.id! }],
    enabled: !!user?.id,
  })

  const { data: dataOffers } = useQuery({
    queryFn: () => getUserIdOffers(user?.id!, { provider: EnumTypeProvider.offer, order: "DESC" }),
    queryKey: ["offers", { userId: user?.id, provider: EnumTypeProvider.offer }],
    enabled: !!user?.id!,
  })

  const itemsOffers = dataOffers?.data || []
  const items = dataFriends?.res || []
  const length = items.length
  const threeFriends = items?.filter((_) => !!_.image).slice(0, 2)

  return (
    <div className={cx("w-full py-2.5 flex flex-col")}>
      <article className="w-full flex flex-row items-center justify-between py-2 border-y border-solid border-grey-stroke-light">
        <p className="text-text-primary text-sm py-1.5 text-left font-medium">{length} друзей</p>
        <div className="flex flex-row items-center flex-nowrap pr-0.375 justify-end"></div>
      </article>
      <article className="w-full flex flex-row items-center justify-between py-2 border-b border-solid border-grey-stroke-light">
        <p className="text-text-primary text-sm py-1.5 text-left font-medium">
          {itemsOffers.length} {nameTitle(itemsOffers.length, EnumTypeProvider.offer)}
        </p>
        <div className="flex flex-row items-center flex-nowrap pr-0.375 justify-end">
          {itemsOffers.slice(0, 6).map((item, index) => (
            <article
              key={`::key::item::pre::offer::${item.id}::`}
              className="w-8 h-8 rounded-full bg-BG-second !-mr-0.375 flex items-center justify-center p-0.5"
              style={{
                zIndex: 10 + index,
              }}
            >
              <section
                className={cx(
                  "w-7 h-7 rounded-full bg-grey-field p-3.5 relative",
                  "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5",
                )}
              >
                <ImageCategory id={item.categoryId!} />
              </section>
            </article>
          ))}
        </div>
      </article>
    </div>
  )
}

BlockButtons.displayName = "BlockButtons"
export default BlockButtons
