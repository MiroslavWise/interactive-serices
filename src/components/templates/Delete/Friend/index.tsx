"use client"

import { useState } from "react"

import Avatar from "@avatar"
import { Button } from "@/components/common"

import { clg } from "@console"
import { deleteFriend } from "@/services"
import { dispatchDeleteFriend, useAuth, useDeleteFriend } from "@/store"

function DeleteFriend() {
  const user = useDeleteFriend(({ user }) => user)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [loading, setLoading] = useState(false)

  function handleDelete() {
    if (user?.id! !== userId! && userId) {
      if (!loading) {
        setLoading(true)
        deleteFriend(user?.id!).then((response) => {
          clg("delete friend: ", response, "warning")
          setLoading(false)
          handleOff()
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
