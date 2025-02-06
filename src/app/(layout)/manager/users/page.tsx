"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"

import Avatar from "@avatar"
import PaginationRS from "@/components/common/PaginationRS"
import IconVerifiedTick from "@/components/icons/IconVerifiedTick"
import RatingAndFeedbackComponent from "@/components/templates/Friends/components/RatingAndFeedbackComponent"

import { getUsers } from "@/services"

const LIMIT = 24

export default () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const { data } = useQuery({
    queryFn: () => getUsers({ page: page, limit: LIMIT, order: "DESC" }),
    queryKey: ["users", { page: page, limit: LIMIT, order: "DESC" }],
  })

  const list = data?.data ?? []
  const total = data?.meta?.total

  return (
    <>
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {list.map((item) => (
          <li
            key={`:df:b:sd:f-${item.id}`}
            className="w-full grid grid-cols-[3.125rem_minmax(0,1fr)] gap-3 p-2 rounded-sm bg-transparent hover:bg-grey-stroke-light transition-colors relative"
          >
            <Avatar className="w-[3.125rem] h-[3.125rem] rounded-md" image={item?.profile?.image} userId={item?.id!} />
            <div className="w-full flex flex-col gap-1 items-start justify-center">
              <Link href={{ pathname: `/customer/${item.id}` }}>
                {item?.profile?.firstName || "Имя"}&nbsp;
                <span className="relative w-5 h-5 p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-[1.125rem] *:h-[1.125rem]">
                  <IconVerifiedTick />
                </span>
              </Link>
              <RatingAndFeedbackComponent id={item.id} />
            </div>
          </li>
        ))}
      </ul>
      <div className="w-full flex items-center md:items-start">
        <PaginationRS total={total} page={page} onPage={setPage} pageSize={LIMIT} />
      </div>
    </>
  )
}
