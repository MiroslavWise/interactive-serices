"use client"

import { useEffect, useState } from "react"

import { type IUserResponse } from "@/services/users/types"
import { useWebSocket } from "@/context"
import { TGenderForm } from "@/components/templates/UpdateProfile/utils/update-form.schema"
import { fromNow } from "@/helpers"

const BE_GENDER: Map<TGenderForm, string> = new Map([
  ["m", "был"],
  ["f", "была"],
])

function OnlineStatus({ user }: { user: IUserResponse }) {
  const [loading, setLoading] = useState(false)
  const [is, setIs] = useState(false)
  const { socket } = useWebSocket()
  const { updated, profile, id } = user ?? {}
  const { gender } = profile ?? {}

  useEffect(() => {
    setLoading(true)
    const onlineUsers = (event: IOnlineSocket) => {
      console.log("onlineUsers: ", event)

      const users = event?.users || []

      if (users.some((_) => _?.id === id)) {
        setIs(true)
      }
    }

    if (!!socket) {
      socket.on(`online`, onlineUsers)

      return () => {
        socket.off(`online`, onlineUsers)
      }
    }
    setTimeout(() => {
      setLoading(false)
    }, 150)
  }, [socket, id])

  if (loading) return <div className="w-full h-4" />

  if (is)
    return (
      <div className="flex flex-row items-center gap-0.375 justify-start md:justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none" className="w-[7px] h-[7px] -mb-0.125">
          <circle cx="3.5" cy="3.5" r="3.5" fill="#109F5C" />
        </svg>
        <span className="text-[0.8125rem] text-text-primary font-normal leading-4">в сети</span>
      </div>
    )

  return (
    <time className="text-[0.8125rem] leading-4 font-normal text-text-secondary text-center">
      {BE_GENDER.has(gender!) ? BE_GENDER.get(gender!) : "был(а)"} {fromNow(updated || new Date())}
    </time>
  )
}

OnlineStatus.displayName = "OnlineStatus"
export default OnlineStatus
