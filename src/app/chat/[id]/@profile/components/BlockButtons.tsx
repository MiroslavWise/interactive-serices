import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { type IUserResponse } from "@/services/users/types"

import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { cx } from "@/lib/cx"
import { getFiendId, getUserIdOffers } from "@/services"
import { EnumTypeProvider } from "@/types/enum"
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
        <p className="text-text-primary text-sm text-left font-medium">{length} друзей</p>
        <div className="flex flex-row items-center flex-nowrap pr-0.375 justify-end">
          {threeFriends.map((_, index) => (
            <Link
              key={`::key::user::friends::img::${_.id}::`}
              href={{ pathname: `/customer/${_.id}` }}
              className={"w-7 h-7 rounded-[0.875rem] relative p-0.875 bg-BG-second !-mr-0.375"}
              title={`${_?.firstName} ${_.lastName}`}
              aria-label={`${_?.firstName} ${_.lastName}`}
              aria-labelledby={`${_?.firstName} ${_.lastName}`}
              style={{
                zIndex: 10 + index,
              }}
            >
              {!!_.image ? (
                <NextImageMotion
                  className="w-6 h-6 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src={_.image?.attributes?.url}
                  alt="avatar"
                  width={40}
                  height={40}
                />
              ) : (
                <IconEmptyProfile className="w-5 h-5 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </Link>
          ))}
        </div>
      </article>
      <article className="w-full flex flex-row items-center justify-between py-2 border-b border-solid border-grey-stroke-light">
        <p className="text-text-primary text-sm text-left font-medium">
          {length} {nameTitle(itemsOffers.length, EnumTypeProvider.offer)}
        </p>
        <div className="flex flex-row items-center flex-nowrap pr-0.375 justify-end">
          
        </div>
      </article>
    </div>
  )
}

BlockButtons.displayName = "BlockButtons"
export default BlockButtons
