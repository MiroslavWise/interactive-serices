"use client"

import Image from "next/image"
import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"
import type { TComponentsNotification } from "./types/types"

import { ButtonCircleGradient, Button } from "@/components/common"

import { dayFormat, usePush, useResize } from "@/helpers"
import { getUserId, serviceNotifications } from "@/services"
import { useAuth_, dispatchVisibleNotifications } from "@/store"

import styles from "./styles/style.module.scss"

export const ComponentsNotification: TComponentsNotification = (props) => {
  const { isTablet } = useResize()
  const { id: userId } = useAuth_(({ auth }) => auth) ?? {}
  const { data, created, operation, provider, id } = props ?? {}
  const { handlePush } = usePush()

  const getUser = useMemo(() => {
    if (!userId || !data) return null
    if (userId === data?.consigner?.userId) {
      return data?.initiator?.userId
    } else {
      return data?.consigner?.userId
    }
  }, [userId, data])

  const { data: userData } = useQuery({
    queryFn: () => getUserId(getUser!),
    queryKey: ["user", { userId: getUser }],
    enabled: !!getUser,
  })

  function handleCancel() {
    if (isTablet) {
      dispatchVisibleNotifications(false)
    }
    serviceNotifications.patch(
      {
        enabled: false,
      },
      id!,
    )
  }

  function handleBarter() {
    if (provider === "barter" && !!userId) {
      handleCancel()
      if (data?.threadId) {
        handlePush(`/messages?thread=${data?.threadId}`)
      } else {
        handlePush(`/messages?barter-id=${data?.id}-${getUser}`)
      }
    }
  }

  const titleBarter = useMemo(() => {
    if (data) {
      if (userId === data?.initiator?.userId) {
        return `Вы предлагаете ${data?.initiator?.title?.toLowerCase()} взамен вы хотите ${data?.consigner?.title?.toLowerCase()}`
      } else {
        return `${
          userData?.res?.profile?.firstName
        } предлагает вам ${data?.consigner?.title?.toLowerCase()} взамен на ${data?.initiator?.title?.toLowerCase()}`
      }
    }
    return null
  }, [data, userId, userData])

  return (
    <li className={styles.container} data-provider={props.provider} data-name={props.provider}>
      <div data-block-info>
        <h3>
          {provider === "barter" && operation === "create" && data?.status === EnumStatusBarter.INITIATED ? (
            <span>Предложение обмена: </span>
          ) : null}
          {titleBarter}
        </h3>
        <div data-footer>
          <div data-date>
            <Image src="/svg/calendar.svg" alt="calendar" width={16} height={16} unoptimized />
            <p>{dayFormat(created!, "dd.MM.yyyy")}</p>
          </div>
          <div data-buttons>
            <Button
              type="button"
              typeButton="regular-primary"
              label="Посмотреть"
              onClick={(event) => {
                event.stopPropagation()
                handleBarter()
              }}
            />
            <ButtonCircleGradient type="primary" handleClick={handleCancel} icon="/svg/x-close-primary.svg" />
          </div>
        </div>
      </div>
    </li>
  )
}
