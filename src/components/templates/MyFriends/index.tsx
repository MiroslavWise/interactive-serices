import Link from "next/link"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import Avatar from "@avatar"
import IconXClose from "@/components/icons/IconXClose"
import NoFriends from "../Friends/components/NoFriends"
import { Button, ButtonLink } from "@/components/common"
import IconAccentChat from "@/components/icons/IconAccentChat"
import IconCheckFriend from "@/components/icons/IconCheckFriend"
import LoadingFriends from "../Friends/components/LoadingFriends"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"
import RatingAndFeedbackComponent from "../Friends/components/RatingAndFeedbackComponent"

import { cx } from "@/lib/cx"
import { useWebSocket } from "@/context"
import { getFriends, postFriend } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"
import { DeclensionAllQuantityFriends } from "@/lib/declension"
import { dispatchDeleteFriend, dispatchMyFriends, useAuth, useMyFriends } from "@/store"
import { clg } from "@console"
import IconAddFriend from "@/components/icons/IconAddFriend"

function MyFriends() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { profile } = useAuth(({ user }) => user) ?? {}
  const visible = useMyFriends(({ visible }) => visible)
  const { on } = useToast()
  const [loadingAdd, setLoadingAdd] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getFriends({}),
    queryKey: ["friends", { userId: userId, filter: "list" }],
    enabled: !!userId && visible,
    select: (data) => data?.data,
  })
  const {
    data: dataResponse,
    refetch: refetchResponse,
    isLoading: isLoadingResponse,
  } = useQuery({
    queryFn: () => getFriends({ query: { filter: "response", order: "DESC" } }),
    queryKey: ["friends", { userId: userId, filter: "response" }],
    enabled: !!userId,
    select: (data) => data?.data,
    refetchOnMount: true,
  })

  const is = isLoading || isLoadingResponse

  const items = data ?? []
  const length = items.length
  const itemsResponse = dataResponse ?? []
  const lengthName = DeclensionAllQuantityFriends(length)

  function onHandleAdd(id: number) {
    if (!loadingAdd) {
      setLoadingAdd(true)
      postFriend({ id: id }).then((response) => {
        if (response.ok) {
          Promise.all([refetch(), refetchResponse()]).then(() => setLoadingAdd(false))
          on({ message: "Вы приняли заявку в друзья" }, "success")
        }
      })
    }
  }

  const { socket } = useWebSocket()

  useEffect(() => {
    function friendsListener() {
      refetchResponse()
    }

    socket?.on(`friends-${userId}`, friendsListener)

    return () => {
      socket?.off(`friends-${userId}`, friendsListener)
    }
  }, [socket, userId])

  return (
    <div
      className={cx(
        "w-full h-dvh md:h-full fixed inset-0 flex-col items-end bg-translucent",
        visible ? "z-[999] flex visible opacity-100" : "-z-10 invisible hidden opacity-0",
      )}
    >
      <section className="relative h-full w-full md:max-w-[35rem] md:rounded-l-2 bg-BG-second">
        <button
          type="button"
          aria-label="Закрыть друзья"
          aria-labelledby="Закрыть друзья"
          className={cx(
            "absolute flex items-center justify-center w-12 h-12 rounded-full top-0 left-full md:top-6 md:bg-BG-second p-3.5 md:-left-2.5 -translate-x-full z-20",
            "*:h-5 *:w-5 [&>svg>path]:stroke-text-primary",
          )}
          onClick={dispatchMyFriends}
        >
          <IconXClose />
        </button>
        <header className="w-full flex items-center justify-center h-standard-header-modal">
          <h3 className="text-2xl text-center font-semibold text-text-primary">Друзья</h3>
        </header>
        {is ? (
          <LoadingFriends />
        ) : length === 0 ? (
          <NoFriends id={userId!} username={profile?.username!} />
        ) : (
          <section className="h-full-minus-standard-header-modal overflow-hidden overflow-y-auto flex flex-col gap-6 pl-4 pr-4 md:pr-6">
            <p className="text-left text-text-primary text-sm font-medium">{lengthName}</p>
            <ul className="w-full flex flex-col gap-6">
              {itemsResponse.length
                ? itemsResponse.map((item) => (
                    <li
                      key={`:key:my:friend:${item.id}:`}
                      className="w-full h-[3.125rem] grid grid-cols-[3.125rem_minmax(0,1fr)_2.25rem] md:grid-cols-[3.125rem_minmax(0,1fr)_13.0625rem] gap-3 items-center"
                    >
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
                      <div className="w-full hidden md:grid grid-cols-[minmax(0,1fr)_2.25rem] items-center *:h-9 *:w-full *:rounded-[1.125rem] gap-2.5">
                        <Button
                          type="button"
                          typeButton="fill-primary"
                          label="Добавить в друзья"
                          onClick={() => onHandleAdd(item.id)}
                          disabled={loadingAdd}
                          loading={loadingAdd}
                        />
                        <Link
                          href={{
                            pathname: "/chat",
                            query: {
                              user: item.id,
                            },
                          }}
                          prefetch={false}
                          className="bg-grey-field relative p-[1.125rem] *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5"
                          onClick={dispatchMyFriends}
                        >
                          <IconAccentChat />
                        </Link>
                      </div>
                      <button
                        type="button"
                        className="h-9 w-9 relative rounded-full flex md:hidden *:w-5 *:h-5"
                        onClick={() => onHandleAdd(item.id)}
                      >
                        <IconAddFriend />
                      </button>
                    </li>
                  ))
                : null}
              {items.map((item) => (
                <li
                  key={`:key:my:friend:${item.id}:`}
                  className="w-full h-[3.125rem] grid grid-cols-[3.125rem_minmax(0,1fr)_2.25rem] md:grid-cols-[3.125rem_minmax(0,1fr)_13.0625rem] items-center gap-3"
                >
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
                  <div className="w-full hidden md:grid grid-cols-[minmax(0,1fr)_2.25rem] items-center *:h-9 *:w-full *:rounded-[1.125rem] gap-2.5">
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
                      onClick={dispatchMyFriends}
                    />
                    <div
                      className="bg-grey-field relative p-[1.125rem] *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 cursor-pointer"
                      onClick={() => dispatchDeleteFriend(item)}
                    >
                      <IconCheckFriend />
                    </div>
                  </div>
                  <Link
                    href={{
                      pathname: "/chat",
                      query: {
                        user: item.id,
                      },
                    }}
                    prefetch={false}
                    className="h-9 w-9 relative rounded-full flex md:hidden *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5"
                  >
                    <IconAccentChat />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </div>
  )
}

MyFriends.displayName = "MyFriends"
export default MyFriends
