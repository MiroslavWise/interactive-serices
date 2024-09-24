import Link from "next/link"
import { useCallback, useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { type TFriends } from "../constants/segments"

import Avatar from "@avatar"
import NoFriends from "./NoFriends"
import LoadingFriends from "./LoadingFriends"
import IconAccentChat from "@/components/icons/IconAccentChat"
import IconCheckFriend from "@/components/icons/IconCheckFriend"
import RatingAndFeedbackComponent from "./RatingAndFeedbackComponent"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"
import { Button, ButtonLink } from "@/components/common"

import { useAuth, useFriends } from "@/store"
import { useToast } from "@/helpers/hooks/useToast"
import { DeclensionAllQuantityFriends } from "@/lib/declension"
import { getFiendId, getFriends, postFriend } from "@/services"

function ListAll({ state }: { state: TFriends }) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { profile } = useAuth(({ user }) => user) ?? {}
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
  const myFriendsIds = dataMyFriends?.data?.map((item) => item.id) || []

  const filterFriends = useMemo(() => {
    if (state === "all") return items
    return items.filter((item) => myFriendsIds.includes(item.id))
  }, [state, items, myFriendsIds])

  const length = filterFriends.length
  const name = DeclensionAllQuantityFriends(length)

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
      postFriend({ id: id }).then((response) => {
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

  if (isLoading || isLoadingMyFriends || isLoadingRequest || isLoadingResponse) return <LoadingFriends />

  if (length === 0) return <NoFriends id={id!} username={profile?.username!} />

  return (
    <article className="w-full px-5 flex flex-col gap-6 pt-6">
      <p className="text-left text-text-primary text-sm font-medium">{name}</p>
      <ul className="w-full flex flex-col gap-6 overflow-y-auto">
        {filterFriends.map((item) => (
          <li key={`:key:friend:${item.id}:`} className="w-full h-[3.125rem] grid grid-cols-[3.125rem_minmax(0,1fr)_13.0625rem] gap-3">
            <Avatar className="w-[3.125rem] h-[3.125rem] aspect-square rounded-.625" image={item.image} userId={item.id} />
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
                  <div className="bg-grey-field relative p-[1.125rem] *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
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
                    className="bg-grey-field relative p-[1.125rem] *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5"
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
