"use client"

import { useCallback, useEffect, useRef } from "react"

import { ButtonClose } from "@/components/common"

import { DATA_MODAL, ID_MODAL, STYLE_MODAL } from "../Data"

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

import styles from "./style.module.scss"

function Modal() {
  const data = useModal(({ data }) => data)
  const visible = useModal(({ visible }) => visible)
  const ref = useRef<HTMLDivElement>(null)
  const typeAdd = useAddCreateModal(({ typeAdd }) => typeAdd)
  const visibleOnboarding = useOnboarding(({ visible }) => visible)
  const visibleCreateCategory = useCreateNewCategory(({ visible }) => visible)

  const close = useCallback(() => {
    // if (data && [EModalData.BalloonAlert, EModalData.BalloonOffer, EModalData.BalloonDiscussion].includes(data)) {
    //   return
    // }
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
  }, [data, visibleCreateCategory, visibleOnboarding, typeAdd])

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
  }, [visible, data, visibleCreateCategory, visibleOnboarding])

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
          "bg-BG-second rounded-t-3xl rounded-b-none max-md:overflow-hidden max-md:min-h-20 md:rounded-[2rem] w-full relative",
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
