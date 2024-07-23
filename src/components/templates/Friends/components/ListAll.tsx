import Link from "next/link"
import { useCallback, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { type TFriends } from "../constants/segments"

import IconAccentChat from "@/components/icons/IconAccentChat"
import IconCheckFriend from "@/components/icons/IconCheckFriend"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import RatingAndFeedbackComponent from "./RatingAndFeedbackComponent"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"
import { Button, ButtonLink, NextImageMotion } from "@/components/common"

import { useAuth, useFriends } from "@/store"
import { useToast } from "@/helpers/hooks/useToast"
import { DeclensionAllQuantityFriends } from "@/lib/declension"
import { getFiendId, getFriends, serviceFriends } from "@/services"

function ListAll({ state }: { state: TFriends }) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const id = useFriends(({ id }) => id)
  const { on } = useToast()

  const { data, isLoading } = useQuery({
    queryFn: () => getFiendId(id!),
    queryKey: ["friends", { user: id! }],
    enabled: !!id,
  })

  const { data: dataMyFriends, isLoading: isLoadingMyFriends } = useQuery({
    queryFn: () => getFriends({}),
    queryKey: ["friends", { userId: userId, filter: "list" }],
    enabled: !!userId,
    refetchOnMount: true,
  })
  const { data: dataRequest, isLoading: isLoadingRequest } = useQuery({
    queryFn: () => getFriends({ query: { filter: "request", order: "DESC" } }),
    queryKey: ["friends", { userId: userId, filter: "request" }],
    enabled: !!userId && !!id,
    refetchOnMount: true,
  })
  const {
    data: dataResponse,
    isLoading: isLoadingResponse,
    refetch: refetchResponse,
  } = useQuery({
    queryFn: () => getFriends({ query: { filter: "response", order: "DESC" } }),
    queryKey: ["friends", { userId: userId, filter: "response" }],
    enabled: !!userId && !!id,
    refetchOnMount: true,
  })

  const items = data?.data || []
  const length = items.length
  const myFriendsIds = dataMyFriends?.data?.map((item) => item.id) || []
  const name = DeclensionAllQuantityFriends(length)

  const filterFriends = useMemo(() => {
    if (state === "all") return items
    return items.filter((item) => myFriendsIds.includes(item.id))
  }, [state, items, myFriendsIds])

  // const disabledOnFriendsResponse = useCallback(
  //   (id: number) => {
  //     if (!dataResponse?.data) return true
  //     return dataResponse?.data?.some((item) => item.id === id)
  //   },
  //   [dataResponse?.data],
  // )

  const disabledOnFriendsRequest = useCallback(
    (id: number) => {
      if (!dataRequest?.data) return true
      return dataRequest?.data?.some((item) => item.id === id)
    },
    [dataRequest?.data],
  )

  function onHandleAdd(id: number) {
    const disabled = disabledOnFriendsRequest(id)

    if (!disabled) {
      serviceFriends.post({ id: id }).then((response) => {
        if (response.ok) {
          if (dataResponse?.data?.some((item) => item?.id === userId)) {
            on({ message: "Вы приняли заявку в друзья" }, "success")
            refetchResponse()
          } else {
            on({ message: `Заявка на добавление в друзья отправлена` }, "default")
          }
        }
      })
    }
  }

  if (isLoading || isLoadingMyFriends || isLoadingRequest || isLoadingResponse)
    return (
      <article className="loading-screen w-full px-5 flex flex-col gap-6 items-start pt-6">
        <span className="max-w-52 w-full h-5 rounded-[0.625rem]" />
        {["user-load-a203404", "user-load-d203404", "user-load-f203404", "user-load-l203404"].map((item) => (
          <a
            key={`:key:load:friend:${item}:`}
            className="w-full h-[3.125rem] grid grid-cols-[3.125rem_minmax(0,1fr)_calc(10.1875rem_+_2.25rem_+_0.625rem)] gap-3"
          >
            <span className="aspect-square w-full h-full rounded-[0.625rem]" />
            <div className="w-full flex flex-col items-start justify-center gap-1 *:w-full">
              <span className="w-full max-w-[66%] h-5 rounded-[0.625rem]" />
              <span className="w-full max-w-[46%] h-[1.125rem] rounded-[0.5625rem]" />
            </div>
            <div className="w-full grid grid-cols-[minmax(0,1fr)_2.25rem] items-center *:h-9 *:w-full *:rounded-[1.125rem] gap-2.5">
              <span />
              <span />
            </div>
          </a>
        ))}
      </article>
    )

  if (length === 0)
    return (
      <article className="w-full px-5 flex flex-col items-center py-20">
        <div className="w-full max-w-80 flex flex-col gap-5 items-center">
          <article className="w-full flex flex-col items-center gap-2.5">
            <div className="w-14 h-14 rounded-full flex items-center justify-center p-4 bg-grey-field">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.99707 7.05018C5.99707 8.66588 6.96649 10.0602 8.35643 10.6755C8.29445 10.3568 8.26347 10.0248 8.26347 9.69284C8.26347 7.02362 10.3041 4.74837 12.8848 4.36769C12.1588 3.57976 11.1186 3.08398 9.96327 3.08398C7.77212 3.08398 5.99707 4.85904 5.99707 7.05018ZM10.6499 14.1485C8.15334 14.9807 6.12155 16.8354 5.05032 19.2346H2.97426C2.50062 19.2346 2.12436 18.8584 2.21732 18.2918C2.62899 14.8567 5.16541 12.0547 8.53402 11.373C8.91471 12.5062 9.67165 13.4801 10.6499 14.1485ZM17.8129 9.69211C17.8129 7.43138 15.9632 5.55849 13.7071 5.52593L13.7042 5.52591L13.6911 5.52586L13.6885 5.52579L13.6713 5.52148H13.6467C11.3658 5.52148 9.48047 7.30777 9.48047 9.68768C9.48047 10.1756 9.56414 10.6411 9.72243 11.0788C9.74613 11.1452 9.77411 11.2151 9.80173 11.2796C10.183 12.1902 10.8794 12.9423 11.7483 13.3931C12.3204 13.6907 12.9672 13.8583 13.6467 13.8583C15.9306 13.8583 17.8129 11.976 17.8129 9.69211ZM10.5522 15.4758C8.79649 16.1881 7.34474 17.4856 6.44181 19.1327C5.96129 20.0121 5.63901 20.9915 5.51604 22.0341C5.46257 22.3674 5.54512 22.6626 5.72845 22.876C5.9112 23.0888 6.18092 23.2046 6.4711 23.2046H20.8264C21.4288 23.2046 21.8918 22.6158 21.7811 22.0309C21.2925 17.97 17.8114 14.7793 13.651 14.7793C12.977 14.7793 12.2937 14.8737 11.7044 15.0706C11.6119 15.0944 11.5284 15.1272 11.4522 15.1699C11.1416 15.2581 10.8454 15.3558 10.5522 15.4758Z"
                  fill="url(#paint0_linear_5638_165758)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5638_165758"
                    x1="2.20312"
                    y1="3.08398"
                    x2="25.5019"
                    y2="9.28371"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#8B89F5" />
                    <stop offset="1" stop-color="#625FF9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className="text-text-primary text-center text-lg font-semibold">Нет друзей</h3>
          </article>
          <Button type="button" typeButton="fill-primary" label="Пригласить друзей в Sheira" className="max-w-min px-5 py-2.5" />
        </div>
      </article>
    )

  return (
    <article className="w-full px-5 flex flex-col gap-6 pt-6">
      <p className="text-left text-text-primary text-sm font-medium">{name}</p>
      <ul className="w-full flex flex-col gap-6 overflow-y-auto">
        {filterFriends.map((item) => (
          <li
            key={`:key:friend:${item.id}:`}
            className="w-full h-[3.125rem] grid grid-cols-[3.125rem_minmax(0,1fr)_calc(10.1875rem_+_2.25rem_+_0.625rem)] gap-3"
          >
            <Link
              prefetch={false}
              href={{ pathname: `/customer/${item.id}` }}
              className={`w-full h-full aspect-square rounded-[0.625rem] relative ${
                !item.image ? "bg-grey-stroke-light" : ""
              } overflow-hidden cursor-pointer`}
              target="_blank"
            >
              {!!item.image ? (
                <NextImageMotion
                  className="rounded-[0.625rem] overflow-hidden w-[3.125rem] h-[3.125rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src={item.image?.attributes?.url}
                  alt="avatar"
                  width={100}
                  height={100}
                />
              ) : (
                <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7" />
              )}
            </Link>
            <div className="w-full flex flex-col items-start justify-center gap-1">
              <Link
                prefetch={false}
                href={{ pathname: `/customer/${item.id}` }}
                className="w-full text-base text-left font-medium line-clamp-1 flex flex-row flex-nowrap gap-1 text-ellipsis cursor-pointer items-center"
                target="_blank"
              >
                {item?.firstName || "Имя"} {item.lastName || "Фамилия"}
                <span className="relative w-5 h-5 p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-[1.125rem] *:h-[1.125rem]">
                  <IconVerifiedTick />
                </span>
              </Link>
              <RatingAndFeedbackComponent id={item.id} />
            </div>
            <div className="w-full grid grid-cols-[minmax(0,1fr)_2.25rem] items-center *:h-9 *:w-full *:rounded-[1.125rem] gap-2.5">
              {userId !== item.id && !!userId ? (
                myFriendsIds.includes(item.id) ? (
                  <ButtonLink
                    typeButton="fill-primary"
                    href={{
                      pathname: "/chat",
                      query: {
                        user: item.id,
                      },
                    }}
                    label="Написать"
                    prefetch={false}
                  />
                ) : (
                  <Button
                    type="button"
                    typeButton="fill-primary"
                    label="Добавить в друзья"
                    onClick={() => onHandleAdd(item.id)}
                    disabled={disabledOnFriendsRequest(item.id)}
                  />
                )
              ) : (
                <span />
              )}
              {userId !== item.id && !!userId ? (
                myFriendsIds.includes(item.id) ? (
                  <div className="bg-grey-field relative p-[1.125rem] [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5">
                    <IconCheckFriend />
                  </div>
                ) : (
                  <Link
                    href={{
                      pathname: "/chat",
                      query: {
                        user: item.id,
                      },
                    }}
                    prefetch={false}
                    className="bg-grey-field relative p-[1.125rem] [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5"
                  >
                    <IconAccentChat />
                  </Link>
                )
              ) : (
                <span />
              )}
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}

ListAll.displayName = "ListAll"
export default ListAll
