"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import Avatar from "@avatar"
import { Button } from "@/components/common"

import { clg } from "@console"
import { deleteFriend, getFriends } from "@/services"
import { dispatchDeleteFriend, useAuth, useDeleteFriend } from "@/store"

function DeleteFriend() {
  const user = useDeleteFriend(({ user }) => user)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [loading, setLoading] = useState(false)

  const { refetch } = useQuery({
    queryFn: () => getFriends({}),
    queryKey: ["friends", { userId: userId, filter: "list" }],
    enabled: false,
  })
  const { refetch: refetchResponse } = useQuery({
    queryFn: () => getFriends({ query: { filter: "response", order: "DESC" } }),
    queryKey: ["friends", { userId: userId, filter: "response" }],
    enabled: false,
  })

  function handleDelete() {
    if (user?.id! !== userId! && userId) {
      if (!loading) {
        setLoading(true)
        deleteFriend(user?.id!).then((response) => {
          Promise.all([refetch(), refetchResponse()])
          clg("delete friend: ", response, "warning")
          requestAnimationFrame(() => {
            setLoading(false)
            handleOff()
          })
        })
      }
    }
  }

  function handleOff() {
    dispatchDeleteFriend()
  }

  return (
    <>
      <article>
        <Avatar className="w-11 h-11 rounded-[0.625rem]" image={user?.image} />
        <h2>
          Вы хотите удалить&nbsp;
          <p className="text-text-accent contents">
            {user?.firstName ?? "Имя"} {user?.lastName ?? "Фамилия"}
          </p>
          &nbsp;из друзей?
        </h2>
      </article>
      <footer>
        <Button type="button" typeButton="fill-primary" label="Да, удалить" onClick={handleDelete} loading={loading} />
        <Button type="button" typeButton="regular-primary" label="Нет, оставить" disabled={loading} onClick={handleOff} />
      </footer>
    </>
  )
}

DeleteFriend.displayName = "DeleteFriend"
export default DeleteFriend
