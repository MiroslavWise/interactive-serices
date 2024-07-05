"use client"

import { useQuery } from "@tanstack/react-query"

import { useCurrentAndCompleted } from "./components/WrapperCurrentAndCompleted"

import { useAuth } from "@/store"
import { getBarters } from "@/services"

export default () => {
  const { state } = useCurrentAndCompleted()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data, isLoading } = useQuery({
    queryFn: () =>
      getBarters({
        status: state,
        user: userId!,
        order: "DESC",
      }),
    queryKey: ["barters", { userId: userId, status: state }],
    enabled: !!userId && !!state,
  })

  const items = data?.data || []
  const length = items.length

  if (isLoading)
    return (
      <section className="w-full loading-screen flex flex-col gap-4 overflow-x-hidden overflow-y-auto">
        <span className="w-full h-5 bg-grey-field rounded-xl" />
        <ul className="w-full flex flex-col gap-4">
          {[1, 2, 3].map((_) => (
            <li
              key={`::key::load::barter::${_}::`}
              className="w-full flex flex-col items-start gap-3 rounded-2xl border border-solid border-grey-stroke-light *:w-full p-3"
            >
              <span className="max-w-[5.3125rem] h-4 rounded-lg" />
              <span className="rounded-2xl h-[3.625rem]" />
              <div className="grid grid-cols-2 items-center gap-2.5 *:h-4 *:rounded-lg">
                <span />
                <span />
              </div>
              <span className="h-9 rounded-[1.125rem]" />
            </li>
          ))}
        </ul>
      </section>
    )

  return (
    <section className="flex w-full flex-col items-start gap-2.5">
      {length ? (
        <>
          <p></p>
          <ul className="w-full overflow-x-hidden overflow-y-scroll flex flex-col gap-4"></ul>
        </>
      ) : (
        <article></article>
      )}
    </section>
  )
}
