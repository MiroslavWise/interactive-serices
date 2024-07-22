"use client"

import { useState } from "react"

import type { TItemListFriend } from "../types/types"

import { NextImageMotion } from "@/components/common"
import { ButtonCircleGradient } from "@/components/common"

import { serviceFriends } from "@/services"
import { usePush, useResize } from "@/helpers"
import { useReloadFriends } from "../hooks/useReloadFriends"

export const ItemListFriend: TItemListFriend = ({ user, type }) => {
  const { image, firstName, lastName, username, id } = user ?? {}
  const [loading, setLoading] = useState(false)
  const { refresh } = useReloadFriends({ enabled: false, type: type })
  const { handlePush } = usePush()
  const { isTablet } = useResize()

  function handleSuccess() {
    if (!loading) {
      setLoading(true)
      serviceFriends.post({ id: id }).then(() => {
        setTimeout(() => {
          refresh([type, "list"]).then(() => {
            setLoading(false)
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
            setLoading(false)
          })
        }, 850)
      })
    }
  }

  function handleProfile() {
    if (isTablet) {
      handlePush(`/user?id=${id}`)
    } else {
      // dispatchProfilePublic({ visible: true, idUser: id! })
    }
  }

  return (
    <li>
      <div data-block-profile>
        <div data-block-avatar onClick={handleProfile}>
          <NextImageMotion src={image?.attributes?.url!} alt="avatar" width={60} height={60} />
        </div>
        <div data-name-geo>
          <h4>
            {firstName} {lastName}
          </h4>
          <p>{username}</p>
        </div>
      </div>
      <div data-block-buttons>
        <ButtonCircleGradient
          type="primary"
          icon="/svg/message-dots-circle-primary.svg"
          size={20}
          handleClick={() => {
            handlePush(`/chat?user=${id}`)
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
