"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"

import { type IUserResponse } from "@/services/users/types"

import ButtonMenuMobile from "./ButtonMenuMobile"
import { Button, ButtonLink } from "@/components/common"
import IconAccentChat from "@/components/icons/IconAccentChat"
import IconCheckAccent from "@/components/icons/IconCheckAccent"
import IconCheckFriend from "@/components/icons/IconCheckFriend"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { useToast } from "@/helpers/hooks/useToast"
import { getFiendId, getFriends, serviceFriends } from "@/services"

function FriendsButtons({ user }: { user: IUserResponse }) {
  const [loading, setLoading] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [isFriends, setIsFriends] = useState(false)
  const [isRequest, setIsRequest] = useState(false)
  const [isResponse, setIsResponse] = useState(false)
  const { on } = useToast()
  const [
    { data: dataRequest, isFetching: isLoadingRequest },
    { data: dataResponse, isFetching: isLoadingResponse },
    { data: dataUserFriends, isFetching },
  ] = useQueries({
    queries: [
      {
        queryFn: () => getFriends({ query: { filter: "request", order: "DESC" } }),
        queryKey: ["friends", { userId: userId, filter: "request" }],
        enabled: !!userId && !!user?.id,
        refetchOnMount: true,
      },
      {
        queryFn: () => getFriends({ query: { filter: "response", order: "DESC" } }),
        queryKey: ["friends", { userId: userId, filter: "response" }],
        enabled: !!userId && !!user?.id,
        refetchOnMount: true,
      },
      {
        queryFn: () => getFiendId(user?.id!),
        queryKey: ["friends", { user: user?.id! }],
        enabled: !!user?.id && !!userId,
        refetchOnMount: true,
      },
    ],
  })

  useEffect(() => {
    setIsFriends(!!dataUserFriends?.res?.some((item) => item?.id === userId!))
  }, [dataUserFriends, userId])
  useEffect(() => {
    setIsRequest(!!dataRequest?.res?.some((item) => item?.id === user?.id!))
  }, [dataRequest, user?.id])
  useEffect(() => {
    setIsResponse(!!dataResponse?.res?.some((item) => item?.id === user?.id!))
  }, [dataResponse, user?.id])

  const isLoadingAll = isLoadingRequest || isLoadingResponse || isFetching

  function handleOnFriends() {
    if (user?.id! !== userId! && userId) {
      if (!loading) {
        setLoading(true)
        serviceFriends.post({ id: Number(user?.id!) }).then((response) => {
          if (response?.ok) {
            if (isResponse) {
              setIsResponse(false)
              on({ message: "Вы приняли заявку в друзья" }, "success")
            }
            if (!isResponse && !isLoadingAll) {
              setIsRequest(true)
              on(
                {
                  message: `Заявка на добавление в друзья отправлена`,
                },
                "default",
              )
            }
          }
          setLoading(false)
          console.log("serviceFriends: ", response)
        })
      }
    }
  }

  function handleDelete() {
    if (user?.id! !== userId! && userId) {
      if (!loading) {
        setLoading(true)
        serviceFriends.delete(user?.id!).then((response) => {
          if (response?.ok) {
            if (isResponse) {
              setIsResponse(false)
            } else if (isFriends) {
              setIsFriends(false)
            } else if (isRequest) {
              setIsRequest(false)
            }
          }
          setLoading(false)
          console.log("delete friend: ", response)
        })
      }
    }
  }

  return (
    <div
      className={cx(
        user?.id === userId && "hidden",
        "w-full grid grid-cols-[minmax(0,1fr)_2.25rem_2.25rem] md:grid-cols-[minmax(0,1fr)_2.25rem] gap-0.625 [&>*]:h-9 [&>*]:w-full [&>*]:rounded-[1.25rem]",
        isLoadingAll && "loading-screen",
      )}
    >
      {isLoadingAll ? (
        <>
          <span />
          <span />
          <span className="md:hidden" />
        </>
      ) : isFriends ? (
        <>
          <ButtonLink
            label="Написать"
            href={{
              pathname: "/chat",
              query: {
                user: user?.id,
              },
            }}
            typeButton="regular-primary"
          />
          <button
            type="button"
            className="bg-btn-second-default relative p-[1.125rem] [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5 border-none outline-none"
            onClick={handleDelete}
          >
            <IconCheckFriend />
          </button>
          <ButtonMenuMobile />
        </>
      ) : isRequest ? (
        <>
          <Button
            type="button"
            typeButton="regular-primary"
            label="Запрос отправлен"
            prefixIcon={<IconCheckAccent />}
            className="gap-0.375 [&>svg]:w-4 [&>svg]:h-4"
          />
          <Link
            href={{
              pathname: "/chat",
              query: {
                user: user?.id,
              },
            }}
            className="bg-btn-second-default relative p-[1.125rem] [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5"
          >
            <IconAccentChat />
          </Link>
          <ButtonMenuMobile />
        </>
      ) : (
        <>
          <Button label="Добавить в друзья" type="button" typeButton="fill-primary" loading={loading} onClick={handleOnFriends} />
          <Link
            href={{
              pathname: "/chat",
              query: {
                user: user?.id,
              },
            }}
            className="bg-btn-second-default relative p-[1.125rem] [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5"
          >
            <IconAccentChat />
          </Link>
          <ButtonMenuMobile />
        </>
      )}
    </div>
  )
}

FriendsButtons.displayName = "FriendsButtons"
export default FriendsButtons
