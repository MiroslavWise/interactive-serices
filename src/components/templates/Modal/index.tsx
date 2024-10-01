"use client"

import { useEffect, useRef } from "react"

import { ButtonClose } from "@/components/common"

import {
  useModal,
  dispatchModalClose,
  EModalData,
  dispatchModal,
  useCreateNewCategory,
  dispatchVisibleCreateNewCategory,
  useOnboarding,
  dispatchOpenPreCloseCreateService,
  useAddCreateModal,
} from "@/store"
import { cx } from "@/lib/cx"
import { DATA_MODAL, ID_MODAL, STYLE_MODAL } from "../Data"

import styles from "./style.module.scss"

function Modal() {
  const data = useModal(({ data }) => data)
  const visible = useModal(({ visible }) => visible)
  const ref = useRef<HTMLDivElement>(null)
  const typeAdd = useAddCreateModal(({ typeAdd }) => typeAdd)
  const visibleOnboarding = useOnboarding(({ visible }) => visible)
  const visibleCreateCategory = useCreateNewCategory(({ visible }) => visible)

  useEffect(() => {
    if (data && ref.current) {
      if (
        [
          EModalData.NewServicesBanner,
          EModalData.NewServicesBannerMap,
          EModalData.ComplaintModal,
          EModalData.CompletionTransaction,
        ].includes(data)
      ) {
        ref.current.style.setProperty("--width-section", `31.25rem`)
      }
      if (
        [
          EModalData.CreateNewOptionModal,
          EModalData.CreateNewOptionModalMap,
          EModalData.ReciprocalExchange,
          EModalData.CREATE_POST,
          EModalData.CREATE_POST_MAP,
          EModalData.CREATE_NEW_NOTE,
        ].includes(data)
      ) {
        ref.current.style.setProperty("--width-section", `35rem`)
      }
      if ([EModalData.BalloonAlert, EModalData.BalloonDiscussion, EModalData.BalloonOffer].includes(data)) {
        ref.current.style.setProperty("--width-section", `25rem`)
      }
      if ([EModalData.UpdateProfile, EModalData.ActiveServicesFrom].includes(data)) {
        ref.current.style.setProperty("--width-section", `41.875rem`)
      }
      if ([EModalData.ModalSign, EModalData.ChangePassword].includes(data)) {
        ref.current.style.setProperty("--width-section", `30.625rem`)
      }
      if (
        [
          EModalData.OutAccount,
          EModalData.DeleteOffer,
          EModalData.DeleteUser,
          EModalData.DeleteChat,
          EModalData.DELETE_FRIEND,
          EModalData.SuccessNewOptional,
          EModalData.UpdateDiscussionAndAlert,
          EModalData.CancelExchange,
          EModalData.SUCCESS_CREATE_POST,
          EModalData.SUCCESS_PROVIDE_FEEDBACK,
        ].includes(data)
      ) {
        ref.current.style.setProperty("--width-section", `33.75rem`)
      }
      if (EModalData.UpdateOffer == data) {
        ref.current.style.setProperty("--width-section", `37.25rem`)
      }
      if (EModalData.BALLOON_POST == data) {
        ref.current.style.setProperty("--width-section", `40rem`)
      }
    }

    return () => {
      if (ref.current) {
        ref.current.style.setProperty("--width-section", `35rem`)
      }
    }
  }, [data])

  function close() {
    if (data && [EModalData.ChangePassword, EModalData.DeleteUser].includes(data)) {
      dispatchModal(EModalData.UpdateProfile)
      return
    } else if (data === EModalData.CreateNewOptionModal && visibleCreateCategory) {
      dispatchVisibleCreateNewCategory(false)
      return
    } else if (visibleOnboarding && EModalData.CreateNewOptionModal) {
      return
    } else if (data === EModalData.CreateNewOptionModal || data === EModalData.CreateNewOptionModalMap) {
      dispatchOpenPreCloseCreateService(typeAdd!)
      return
    } else {
      dispatchModalClose()
      return
    }
  }

  useEffect(() => {
    if (ref.current && data) {
      if ([EModalData.DeleteUser, EModalData.OutAccount, EModalData.DeleteOffer].includes(data)) {
        ref.current.style.setProperty("--padding-top", "12.5rem")
      } else if ([EModalData.SuccessNewOptional].includes(data)) {
        ref.current.style.setProperty("--padding-top", "9.375rem")
      } else {
        ref.current.style.setProperty("--padding-top", "2.5rem")
      }
    }

    return () => {
      if (ref.current) {
        ref.current.style.setProperty("--padding-top", "2.5rem")
      }
    }
  }, [data])

  useEffect(() => {
    if (visible) {
      const keyDown = (e: KeyboardEvent) => {
        if (e.code == "Escape" || e.keyCode === 27) {
          if (data && [EModalData.BalloonAlert, EModalData.BalloonOffer, EModalData.BalloonDiscussion].includes(data)) {
            return
          }
          close()
        }
      }

      const popState = (e: any) => {
        close()
      }

      window.addEventListener("popstate", popState, false)
      document.addEventListener("keydown", keyDown, false)
      return () => {
        document?.removeEventListener("keydown", keyDown)
        window.removeEventListener("popstate", popState)
      }
    }
  }, [visible, data, visibleCreateCategory, visibleOnboarding, typeAdd])

  return (
    <div
      className={cx(
        styles.wrapperModal,
        "fixed transition-opacity inset-0 w-full h-full bg-translucent md:p-10 flex flex-col items-center max-md:p-0 max-md:!pt-0 max-md:justify-end",
        visible ? "!z-[1000] !visible !opacity-100" : "-z-10 opacity-0 invisible",
      )}
      ref={ref}
      data-enum={data}
      onClick={(event) => {
        event.stopPropagation()
        close()
      }}
    >
      <section
        data-test={`modal-section-${data}`}
        className={cx(
          "bg-BG-second rounded-t-3xl rounded-b-none max-md:overflow-hidden max-md:min-h-20 md:rounded-2 w-full relative",
          STYLE_MODAL.has(data!) ? STYLE_MODAL.get(data!) : "",
        )}
        id={ID_MODAL.has(data!) ? ID_MODAL.get(data!) : ""}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        {visible ? (
          <ButtonClose
            onClick={close}
            className="!top-0 !right-0 md:!-right-1 !translate-x-0 md:!translate-x-full max-md:!bg-transparent max-md:!border-none"
          />
        ) : null}
        {data ? (DATA_MODAL.has(data!) ? DATA_MODAL.get(data!) : null) : null}
      </section>
    </div>
  )
}

Modal.displayName = "Modal"
export default Modal
