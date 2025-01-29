"use client"

import Link from "next/link"
import { toast } from "react-toastify"
import { type DispatchWithoutAction } from "react"

import { EnumStatusBarter } from "@/types/enum"

import Button, { ButtonLink } from "@/components/common/Button"
import { ButtonCircleGradient, ButtonClose, NextImageMotion } from "@/components/common"

import { useResize } from "./use-resize.hook"
import { QUERY_CHAT_MESSAGES } from "@/types/constants"

interface IValue {
  title?: string
  message?: string
  userId?: number
  id?: number
  photo?: string
  name?: string
  username?: string
  time?: number | false
}

export const useToast = () => {
  const { isTablet } = useResize()
  const classNames: Record<TTypeToast, string> = {
    success: "toast-success",
    error: "toast-error",
    warning: "toast-warning",
    barter: "toast-barter",
    default: "toast-default",
    message: "toast-message",
  }

  function onMessage({ id, photo, message, name, threadId }: IPropsMessage) {
    const Message = (
      <div className="message-notifications-toast">
        <ButtonClose position={{}} onClick={() => {}} />
        <section>
          <article>
            <NextImageMotion src={photo!} alt="avatar" width={80} height={80} />
            <h4>{name}</h4>
          </article>
          <p>{message}</p>
        </section>
        <div data-footer>
          <Link href={{ pathname: "/chat", query: { [QUERY_CHAT_MESSAGES]: threadId! } }}>Перейти в чат</Link>
        </div>
      </div>
    )

    return toast(Message, {
      toastId: id,
      position: isTablet ? "bottom-center" : "bottom-left",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  function onBarters({ message, title, status, threadId, threadIdBarter, button }: IPropsBarter) {
    const Message = (
      <div className="message-notifications-toast barter-toast">
        <ButtonClose position={{}} onClick={() => {}} />
        {!!title && <h4>{title}</h4>}
        <p>{message}</p>
        {status === "accepted" && threadId ? (
          <ButtonLink
            type="button"
            typeButton="fill-primary"
            label="Перейти в чат"
            href={{ pathname: `/chat`, query: { [QUERY_CHAT_MESSAGES]: threadId } }}
          />
        ) : null}
        {status === EnumStatusBarter.INITIATED && threadIdBarter ? (
          <ButtonLink
            type="button"
            typeButton="fill-primary"
            label="Перейти в чат"
            href={{ pathname: "/chat", query: { ...threadIdBarter } }}
          />
        ) : null}
        {status === null && !!button ? (
          <Button type="button" typeButton="fill-primary" label={button.label} onClick={button.onClick} />
        ) : null}
      </div>
    )

    return toast(Message, {
      toastId: Math.random(),
      position: isTablet ? "bottom-center" : "bottom-left",
      autoClose: 8.5 * 1_000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  function on(value: IValue, type?: TTypeToast, onClick?: DispatchWithoutAction) {
    const buttons = (
      <div data-buttons>
        <Button
          type="button"
          typeButton="regular-primary"
          label="Посмотреть"
          onClick={(event) => {
            event.stopPropagation()
            if (onClick) onClick()
          }}
        />
        <ButtonCircleGradient type="primary" icon="/svg/x-close-primary.svg" />
      </div>
    )

    const message = (
      <div className="toast-data-render" data-mobile={isTablet}>
        {type === "message" ? (
          <>
            <div data-content className="message">
              <div data-user>
                <NextImageMotion src={value?.photo!} alt="avatar" height={80} width={80} />
                <i>
                  {value?.name} {value?.username ? <span>@{value?.username}</span> : null}
                </i>
              </div>
              <p>{value?.message || ""}</p>
            </div>
            {buttons}
          </>
        ) : (
          <div data-content>
            <p>{value?.message || ""}</p>
          </div>
        )}
      </div>
    )

    return toast(message, {
      toastId: value.id || Math.random(),
      position: isTablet ? "bottom-center" : "bottom-left",
      autoClose: 3500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: classNames?.[type!] || classNames.default,
    })
  }

  function onSimpleMessage(message: string) {
    const div = (
      <div className="message-notifications-toast barter-toast">
        <ButtonClose position={{}} onClick={() => {}} />
        <p>{message}</p>
      </div>
    )

    return toast(div, {
      position: isTablet ? "bottom-center" : "bottom-left",
      autoClose: 3500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: classNames.default,
    })
  }

  return { on, onMessage, onBarters, onSimpleMessage }
}

interface IPropsMessage {
  id: number | string
  threadId: number | string
  message: string
  photo?: string
  name: string
}

interface IPropsBarter {
  message: string
  title?: string
  status: EnumStatusBarter | "accepted" | null
  threadId?: number
  threadIdBarter?: {
    [key: string]: string | number
  }
  button?: {
    onClick: DispatchWithoutAction
    label: string
  }
}

type TTypeToast = "success" | "error" | "warning" | "default" | "barter" | "message"
