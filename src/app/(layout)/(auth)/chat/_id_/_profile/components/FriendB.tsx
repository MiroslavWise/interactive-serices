"use client"

import { useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"

import { type IUserResponse } from "@/services/users/types"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { useToast } from "@/helpers/hooks/useToast"
import { getFiendId, getFriends, postFriend } from "@/services"

function FriendB({ user }: { user: IUserResponse }) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [isFriends, setIsFriends] = useState(false)
  const [isRequest, setIsRequest] = useState(false)
  const [isResponse, setIsResponse] = useState(false)
  const [loading, setLoading] = useState(false)
  const { onBarters, on } = useToast()

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

  const isLoadingAll = isLoadingRequest || isLoadingResponse || isFetching || isLoadingRequest || isLoadingResponse || isFetching

  if (isLoadingAll)
    return (
      <div className="loading-screen w-9 h-9 rounded-full overflow-hidden bg-btn-second-default">
        <span className="w-full h-full" />
      </div>
    )

  function handleOnFriends() {
    if (user?.id! !== userId! && userId) {
      if (!loading && !isFriends && !isRequest && !isResponse) {
        setLoading(true)
        postFriend({ id: Number(user?.id!) }).then((response) => {
          if (response?.ok) {
            if (isResponse) {
              setIsResponse(false)
              on({ message: "Вы приняли заявку в друзья" }, "success")
            }
            if (!isResponse && !isLoadingAll) {
              setIsRequest(true)
              onBarters({
                status: null,
                title: "Заявка отправлена",
                message: `Если ${user?.profile?.firstName || "Имя"} ${user?.profile?.lastName ?? ""} одобрит заявку, вы станете друзьями`,
              })
            }
          }
          setLoading(false)
        })
      }
    }
  }

  const disable = isRequest || isResponse || loading

  return (
    <button
      type="button"
      className="disabled:cursor-no-drop group *:absolute *:left-1/2 *:-translate-x-1/2"
      onClick={handleOnFriends}
      aria-label={isFriends ? "Друг" : "Добавить в друзья"}
      aria-labelledby={isFriends ? "Друг" : "Добавить в друзья"}
      disabled={disable}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="top-1/2 -translate-y-1/2 h-5 w-5"
      >
        {isFriends ? (
          <>
            <path
              d="M10.125 0.989062C7.68114 0.989062 5.7 2.9702 5.7 5.41406C5.7 7.85792 7.68114 9.83906 10.125 9.83906C12.5689 9.83906 14.55 7.85792 14.55 5.41406C14.55 2.9702 12.5689 0.989062 10.125 0.989062ZM7.05 5.41406C7.05 3.71579 8.42672 2.33906 10.125 2.33906C11.8233 2.33906 13.2 3.71579 13.2 5.41406C13.2 7.11234 11.8233 8.48906 10.125 8.48906C8.42672 8.48906 7.05 7.11234 7.05 5.41406ZM5.9518 13.4787C7.68033 12.4494 9.72829 12.1161 11.666 12.4837C12.0322 12.5532 12.3855 12.3127 12.455 11.9464C12.5245 11.5801 12.2839 11.2269 11.9176 11.1574C9.66618 10.7302 7.28164 11.1156 5.26112 12.3187C5.16482 12.3761 5.04562 12.4433 4.90992 12.5199L4.90748 12.5213C4.31469 12.8557 3.41227 13.3648 2.79244 13.9715C2.40435 14.3514 2.02928 14.8578 1.96099 15.4826C1.88813 16.1491 2.18005 16.7703 2.75343 17.3166C3.73414 18.2509 4.9174 19.0057 6.45087 19.0057H11.3751C11.7479 19.0057 12.0501 18.7035 12.0501 18.3307C12.0501 17.9579 11.7479 17.6557 11.3751 17.6557H6.45087C5.40867 17.6557 4.54329 17.1572 3.68463 16.3391C3.31692 15.9888 3.2889 15.7582 3.30299 15.6293C3.32162 15.4588 3.44007 15.2267 3.73676 14.9363C4.21462 14.4685 4.90177 14.0783 5.49707 13.7406C5.65755 13.6496 5.81135 13.5623 5.9518 13.4787Z"
              fill="var(--text-secondary)"
              stroke="var(--text-secondary)"
              className="fill-text-secondary stroke-text-secondary"
              strokeWidth="0.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.959 13L14.5 17L12.5 15"
              stroke="var(--text-secondary)"
              className="stroke-text-secondary"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <path
              d="M10.125 0.989062C7.68114 0.989062 5.7 2.9702 5.7 5.41406C5.7 7.85792 7.68114 9.83906 10.125 9.83906C12.5689 9.83906 14.55 7.85792 14.55 5.41406C14.55 2.9702 12.5689 0.989062 10.125 0.989062ZM7.05 5.41406C7.05 3.71579 8.42672 2.33906 10.125 2.33906C11.8233 2.33906 13.2 3.71579 13.2 5.41406C13.2 7.11234 11.8233 8.48906 10.125 8.48906C8.42672 8.48906 7.05 7.11234 7.05 5.41406ZM5.9518 13.4787C7.68033 12.4494 9.72829 12.1161 11.666 12.4837C12.0322 12.5532 12.3855 12.3127 12.455 11.9464C12.5245 11.5801 12.2839 11.2269 11.9176 11.1574C9.66618 10.7302 7.28164 11.1156 5.26112 12.3187C5.16482 12.3761 5.04562 12.4433 4.90992 12.5199L4.90748 12.5213C4.31469 12.8557 3.41227 13.3648 2.79244 13.9715C2.40435 14.3514 2.02928 14.8578 1.96099 15.4826C1.88813 16.1491 2.18005 16.7703 2.75343 17.3166C3.73414 18.2509 4.9174 19.0057 6.45087 19.0057H11.3751C11.7479 19.0057 12.0501 18.7035 12.0501 18.3307C12.0501 17.9579 11.7479 17.6557 11.3751 17.6557H6.45087C5.40867 17.6557 4.54329 17.1572 3.68463 16.3391C3.31692 15.9888 3.2889 15.7582 3.30299 15.6293C3.32162 15.4588 3.44007 15.2267 3.73676 14.9363C4.21462 14.4685 4.90177 14.0783 5.49707 13.7406C5.65755 13.6496 5.81135 13.5623 5.9518 13.4787Z"
              fill="var(--text-secondary)"
              stroke="var(--text-secondary)"
              className={cx(loading ? "!fill-text-disabled !stroke-text-disabled" : "!fill-text-secondary !stroke-text-secondary")}
              strokeWidth="0.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.8729 14.9872L13.5848 15.0129"
              stroke="var(--text-secondary)"
              className={cx(loading ? "!stroke-text-disabled" : "!stroke-text-secondary")}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.1984 12.3556L16.262 17.6434"
              stroke="var(--text-secondary)"
              className={cx(loading ? "!stroke-text-disabled" : "!stroke-text-secondary")}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
      <article
        className={cx(
          "-top-1 transition-all duration-200 translate-y-0 group-hover:-translate-y-full rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible -z-10 group-hover:z-20 overflow-hidden py-1 px-2 bg-translucent-0.8",
          isFriends ? "hidden" : "flex items-center justify-center",
        )}
      >
        <span className="whitespace-nowrap text-text-button text-xs font-normal">Добавить в друзья</span>
      </article>
    </button>
  )
}

FriendB.displayName = "FriendB"
export default FriendB
