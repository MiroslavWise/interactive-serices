"use client"

import { ButtonClose } from "@/components/common"

import { useModal, dispatchModalClose } from "@/store"
import { DATA_MODAL, ID_MODAL, STYLE_MODAL } from "../Data"

import styles from "./style.module.scss"

export default function Modal() {
  const data = useModal(({ data }) => data)
  const visible = useModal(({ visible }) => visible)

  function close() {
    dispatchModalClose()
  }

  return (
    <div className={styles.wrapperModal} data-visible={visible}>
      <section className={STYLE_MODAL.has(data!) ? STYLE_MODAL.get(data!) : ""} id={ID_MODAL.has(data!) ? ID_MODAL.get(data!) : ""}>
        {visible ? <ButtonClose onClick={close} /> : null}
        {data && DATA_MODAL.has(data!) ? DATA_MODAL.get(data!) : null}
      </section>
    </div>
  )
}
