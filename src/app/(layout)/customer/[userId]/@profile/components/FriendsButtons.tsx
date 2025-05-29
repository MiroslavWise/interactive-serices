"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"

import { EnumSign } from "@/types/enum"
import { type IUserOffer } from "@/services/offers/types"
import { type IUserResponse } from "@/services/users/types"

import ButtonMenuMobile from "./ButtonMenuMobile"
import { IconSprite } from "@/components/icons/icon-sprite"
import Button, { ButtonLink } from "@/components/common/Button"
import IconCheckAccent from "@/components/icons/IconCheckAccent"
import IconCheckFriend from "@/components/icons/IconCheckFriend"

import { cx } from "@/lib/cx"
import { useToast } from "@/helpers/hooks/useToast"
import { getFiendId, getFriends, postFriend } from "@/services"
import { dispatchAuthModal, dispatchDeleteFriend, useAuth } from "@/store"

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
    setIsFriends(!!dataUserFriends?.data?.some((item) => item?.id === userId!))
  }, [dataUserFriends, userId])
  useEffect(() => {
    setIsRequest(!!dataRequest?.data?.some((item) => item?.id === user?.id!))
  }, [dataRequest, user?.id])
  useEffect(() => {
    setIsResponse(!!dataResponse?.data?.some((item) => item?.id === user?.id!))
  }, [dataResponse, user?.id])

  const isLoadingAll = isLoadingRequest || isLoadingResponse || isFetching

  function handleOnFriends() {
    if (!userId) {
      dispatchAuthModal({
        visible: true,
        type: EnumSign.SignIn,
      })
      return
    }
    if (user?.id! !== userId! && userId) {
      if (!loading) {
        setLoading(true)
        postFriend({ id: Number(user?.id!) }).then((response) => {
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
        })
      }
    }
  }

  function handleDelete() {
    const userData: IUserOffer = {
      about: "",
      birthdate: null,
      firstName: user?.profile?.firstName,
      gender: null,
      id: user?.id,
      lastName: user?.profile?.lastName,
      username: user?.profile?.username,
      image: user?.profile?.image,
    }

    dispatchDeleteFriend(userData)
  }

  return (
    <div
      className={cx(
        user?.id === userId && "hidden",
        "w-full grid grid-cols-[minmax(0,1fr)_2.25rem_2.25rem] md:grid-cols-[minmax(0,1fr)_2.25rem] gap-2.5 *:h-9 *:w-full *:rounded-[1.25rem]",
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
            className="bg-btn-second-default relative p-[1.125rem] *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 border-none outline-none"
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
            className="gap-1.5 [&>svg]:w-4 [&>svg]:h-4"
            onClick={handleDelete}
          />
          <Link
            href={{
              pathname: "/chat",
              query: {
                user: user?.id,
              },
            }}
            className="bg-btn-second-default relative p-[1.125rem] *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5"
          >
            <IconSprite id="accent-chat-20-20" className="text-element-accent-1" />
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
            className="bg-btn-second-default relative p-[1.125rem] *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5"
          >
            <IconSprite id="accent-chat-20-20" className="text-element-accent-1" />
          </Link>
          <ButtonMenuMobile />
        </>
      )}
    </div>
  )
}

FriendsButtons.displayName = "FriendsButtons"
export default FriendsButtons
