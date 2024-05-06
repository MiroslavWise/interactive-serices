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
} from "@/store"

import styles from "./style.module.scss"

function Modal() {
  const data = useModal(({ data }) => data)
  const visible = useModal(({ visible }) => visible)
  const ref = useRef<HTMLDivElement>(null)
  const visibleOnboarding = useOnboarding(({ visible }) => visible)
  const visibleCreateCategory = useCreateNewCategory(({ visible }) => visible)

  const close = useCallback(() => {
    if (data && [EModalData.ChangePassword, EModalData.DeleteUser].includes(data)) {
      dispatchModal(EModalData.UpdateProfile)
      return
    } else if (data === EModalData.CreateNewOptionModal && visibleCreateCategory) {
      dispatchVisibleCreateNewCategory(false)
      return
    } else if (visibleOnboarding && EModalData.CreateNewOptionModal) {
      return
    } else {
      dispatchModalClose()
      return
    }
  }, [data, visibleCreateCategory, visibleOnboarding])

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
      className={styles.wrapperModal}
      data-visible={visible}
      ref={ref}
      data-enum={data}
      onClick={(event) => {
        event.stopPropagation()
        close()
      }}
    >
      <section
        data-test={`modal-section-${data}`}
        className={STYLE_MODAL.has(data!) ? STYLE_MODAL.get(data!) : ""}
        id={ID_MODAL.has(data!) ? ID_MODAL.get(data!) : ""}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        {visible ? <ButtonClose onClick={close} /> : null}
        {data ? (DATA_MODAL.has(data!) ? DATA_MODAL.get(data!) : null) : null}
      </section>
    </div>
  )
}

Modal.displayName = "Modal"
export default Modal
