"use client"

import Link from "next/link"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs"

import { EOrder } from "@/services/types/general"

import Avatar from "@avatar"
import PaginationRS from "@/components/common/PaginationRS"
import IconVerifiedTick from "@/components/icons/IconVerifiedTick"
import ComponentSortActive from "../components/ComponentSortActive"
import RatingAndFeedbackComponent from "@/components/templates/Friends/components/RatingAndFeedbackComponent"

import { useDebounce } from "@/helpers"
import { getUsers, IQUsers } from "@/services"
import IconSearch from "@/components/icons/IconSearch"
import ComponentsDotsUser from "../components/ComponentsDotsUser"

const LIMIT = 24

const onFilter = (page: number, search: string, order: EOrder) => {
  const obj: IQUsers = {
    limit: LIMIT,
    order: order,
    page: page,
  }

  if (search) {
    obj.search = search
  }

  return obj
}

export default () => {
  const [order] = useQueryState("sort", parseAsStringEnum<EOrder>(Object.values(EOrder)).withDefault(EOrder.DESC))
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")
  const debouncedValue = useDebounce(onSearch, 1250)

  const filter = onFilter(page, search, order)

  const { data, isLoading } = useQuery({
    queryFn: () => getUsers(filter),
    queryKey: ["users", filter],
  })

  const list = data?.data ?? []
  const total = data?.meta?.total

  function onSearch() {
    const trim = input.trim().toLowerCase()
    setSearch(trim)
  }

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
        <div className="w-full max-w-[35rem] flex flex-col gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(event) => {
              setInput(event.target.value || "")
              debouncedValue()
            }}
            placeholder="Введите имя, фамилия или id, если хотите найти быстрее пользователя"
            className="w-full !pl-11"
          />
          <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 *:w-5 *:h-5">
            <IconSearch />
          </div>
        </div>
        <ComponentSortActive total={total} />
      </div>
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {isLoading ? (
          Array.from({ length: LIMIT }, (_, index) => index).map((item) => (
            <li key={`:loading-${item}:`} className="w-full grid grid-cols-[3.125rem_minmax(0,1fr)] gap-3 p-2 rounded-sm loading-screen">
              <span className="w-[3.125rem] h-[3.125rem] rounded-md aspect-square" />
              <div className="w-full flex flex-col gap-1">
                <span className="w-full h-6 rounded-xl max-w-[70%]" />
                <span className="w-full h-5 rounded-.625 max-w-[36%]" />
              </div>
            </li>
          ))
        ) : list.length > 0 ? (
          list.map((item) => (
            <li
              key={`:df:b:sd:f-${item.id}`}
              className="group w-full grid grid-cols-[3.125rem_minmax(0,1fr)] gap-3 p-2 rounded-sm bg-transparent hover:bg-grey-stroke-light transition-colors relative"
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
              <ComponentsDotsUser />
            </li>
          ))
        ) : (
          <section className="w-full col-span-full flex items-center justify-center">
            <article className="w-full max-w-[35rem] flex flex-col items-center gap-2">
              <h2 className="text-text-primary font-semibold">По выбранным фильтрам нет пользователей</h2>
              <p className="text-text-secondary font-medium">Введите другие данные, что-бы найти нужных вам пользователей</p>
            </article>
          </section>
        )}
      </ul>
      <div className="w-full flex items-center md:items-start">
        <PaginationRS total={total} page={page} onPage={setPage} pageSize={LIMIT} />
      </div>
    </>
  )
}
