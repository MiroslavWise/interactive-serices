"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { EnumTypeProvider } from "@/types/enum"
import type { IResponseOffers } from "@/services/offers/types"

import { Button } from "@/components/common"

import { deleteOffer } from "@/services"
import { useUpdateMutualOffer } from "@/store"

import styles from "./styles/style.module.scss"

export const Buttons = ({ refetch, offer }: { offer: IResponseOffers; refetch(): Promise<any> }) => {
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dispatchUpdateMutual = useUpdateMutualOffer(({ dispatchUpdateMutual }) => dispatchUpdateMutual)

  function handleUpdate() {
    dispatchUpdateMutual({
      visible: true,
      data: offer!,
    })
  }

  function handleDelete() {
    if (!loading) {
      setLoading(true)
      if (offer.id) {
        deleteOffer(offer.id).then((response) => {
          console.log("delete offer!", response)
          requestAnimationFrame(() => {
            refetch().finally(() => setLoading(false))
          })
        })
      }
    }
  }

  return (
    <section className={styles.containerButtons}>
      <Button
        type="button"
        typeButton={"fill-primary"}
        label={
          offer?.provider === EnumTypeProvider.offer
            ? "Изменить предложение"
            : offer?.provider === "request"
            ? "Изменить запрос"
            : "Изменить"
        }
        onClick={handleUpdate}
        prefixIcon={<Image src="/svg/edit-white.svg" alt="edit" width={16} height={16} unoptimized />}
        className={styles.buttonFill}
      />
      <motion.div
        className={styles.buttonTrash}
        data-open={isOpen}
        layout
        onClick={() => setIsOpen((prev) => !prev)}
        initial={{ borderRadius: 16 }}
      >
        {isOpen ? (
          <>
            <Button
              label="Удалить"
              typeButton="fill-primary"
              suffixIcon={<Image src="/svg/trash-black.svg" alt="trash" width={16} height={16} unoptimized />}
              onClick={handleDelete}
              className={styles.buttonDelete}
            />
            <Button label="Отмена" typeButton="regular-primary" className={styles.buttonDelete} />
          </>
        ) : (
          <img src="/svg/trash-black.svg" alt="trash" width={16} height={16} />
        )}
      </motion.div>
    </section>
  )
}
