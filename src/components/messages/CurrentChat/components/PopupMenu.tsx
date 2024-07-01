"use client"

import { useSearchParams } from "next/navigation"
import { type DispatchWithoutAction, memo } from "react"

import type { TPopupMenu } from "./types/types"

import { cx } from "@/lib/cx"
import { patchThread } from "@/services"
import { usePush } from "@/helpers/hooks/usePush"
import { useCountMessagesNotReading } from "@/helpers"
import { IconXClose } from "@/components/icons/IconXClose"
import { usePopupMenuChat } from "@/store"
import { MENU_ITEM_POPUP, type TTypeActionMenu } from "../constants"

import mainStyles from "../styles/style.module.scss"
import styles from "./styles/popup-menu.module.scss"

export const PopupMenu: TPopupMenu = memo(function $PopupMenu({ dataUser }) {
  const searchParams = useSearchParams()
  const idThread = searchParams.get("thread")
  const isVisible = usePopupMenuChat(({ isVisible }) => isVisible)
  const setIsVisible = usePopupMenuChat(({ setIsVisible }) => setIsVisible)
  const { handlePush, handleReplace } = usePush()
  const { refetchCountMessages } = useCountMessagesNotReading()

  function handleClickMenu(value: TTypeActionMenu) {
    const handleObject: Record<TTypeActionMenu, DispatchWithoutAction> = {
      onProfile: () => handlePush(`/customer/${dataUser?.id!}`),
      openBarter: () => {},
      deleteChat: () => {
        handleDeleteChat()
      },
      allRequest: () => {},
      currentExchanges: () => {},
    }
    setIsVisible(false)
    handleObject[value]()
  }

  function handleDeleteChat() {
    patchThread({ enabled: false }, Number(idThread)).then((response) => {
      refetchCountMessages().finally(() => {
        handleReplace("/messages")
      })
    })
  }

  return (
    <div
      className={styles.wrapper}
      data-visible={isVisible}
      onClick={(event) => {
        event.stopPropagation()
        setIsVisible(false)
      }}
    >
      <button
        className={cx(mainStyles.button, styles.dots)}
        onClick={(event) => {
          event.stopPropagation()
          setIsVisible(false)
        }}
        type="button"
        title="Закрыть модальное окно"
      >
        <IconXClose />
      </button>
      <ul
        data-is-open={isVisible}
        className={cx(styles.menu)}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        {MENU_ITEM_POPUP.map((item) => (
          <li key={item.value} onClick={() => handleClickMenu(item.value)}>
            <img src={item.image.url} alt={item.image.alt} width={20} height={20} />
            <p>{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  )
})
