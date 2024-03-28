"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TItemListFriend } from "../types/types"

import { NextImageMotion } from "@/components/common/Image"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ButtonCircleGradient } from "@/components/common/Buttons"

import { usePush, useResize } from "@/helpers"
import { useProfilePublic } from "@/store"
import { getUserId, serviceFriends } from "@/services"
import { useReloadFriends } from "../hooks/useReloadFriends"

export const ItemListFriend: TItemListFriend = ({ id, type }) => {
  const [loading, setLoading] = useState(false)
  const { refresh } = useReloadFriends({ enabled: false, type: type })
  const dispatchProfilePublic = useProfilePublic(({ dispatchProfilePublic }) => dispatchProfilePublic)
  const { handlePush } = usePush()
  const { data } = useQuery({
    queryFn: () => getUserId(id!),
    queryKey: ["user", { userId: id }],
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
  const { isTablet } = useResize()

  const geo = data?.res?.addresses?.find((item) => item.addressType === "main") || null

  function handleSuccess() {
    if (!loading) {
      setLoading(true)
      serviceFriends.post({ id: id }).then((response) => {
        setTimeout(() => {
          refresh([type, "list"]).then((response) => {
            console.log("%c ---response: ---", "color: #0f0", response)
            requestAnimationFrame(() => {
              setLoading(false)
            })
          })
        }, 850)
      })
    }
  }

  function deleteFriends() {
    if (!loading) {
      setLoading(true)
      serviceFriends.delete(id!).then((response) => {
        setTimeout(() => {
          refresh([type]).then((response) => {
            console.log("%c ---response: ---", "color: #0f0", response)
            requestAnimationFrame(() => {
              setLoading(false)
            })
          })
        }, 850)
      })
    }
  }

  function handleProfile() {
    if (isTablet) {
      handlePush(`/user?id=${id}`)
    } else {
      dispatchProfilePublic({ visible: true, idUser: id! })
    }
  }

  return (
    <li>
      <div data-block-profile>
        <div data-block-avatar onClick={handleProfile}>
          <NextImageMotion src={data?.res?.profile?.image?.attributes?.url!} alt="avatar" width={60} height={60} />
        </div>
        <div data-name-geo>
          <h4>
            {data?.res?.profile?.firstName} {data?.res?.profile?.lastName}
          </h4>
          {geo ? <GeoTagging location={geo?.additional!} fontSize={14} size={16} /> : null}
        </div>
      </div>
      <div data-block-buttons>
        <ButtonCircleGradient
          type="primary"
          icon="/svg/message-dots-circle-primary.svg"
          size={20}
          handleClick={() => {
            handlePush(`/messages?user=${id}`)
          }}
        />
        <ButtonCircleGradient type="primary" icon="/svg/x-close-primary.svg" size={20} loading={loading} handleClick={deleteFriends} />
        {type === "response" ? (
          <>
            <ButtonCircleGradient
              type="primary"
              loading={loading}
              icon="/svg/check-circle-primary.svg"
              size={20}
              handleClick={handleSuccess}
            />
          </>
        ) : null}
      </div>
    </li>
  )
}
