"use client"

import { useState } from "react"
import { flushSync } from "react-dom"

import { Button, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { getUserIdOffers, patchOffer } from "@/services"
import { useDeleteOffer, dispatchDeleteOffer, useAuth } from "@/store"

import styles from "@/components/templates/OutAccount/style.module.scss"
import { useQuery } from "@tanstack/react-query"

export const DeleteOffer = () => {
  const userId = useAuth(({ userId }) => userId)
  const visible = useDeleteOffer(({ visible }) => visible)
  const idOffer = useDeleteOffer(({ idOffer }) => idOffer)

  const [loading, setLoading] = useState(false)

  const { refetch } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: "offer", order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: "offer" }],
    enabled: false,
  })

  function close() {
    dispatchDeleteOffer({ visible: false, idOffer: null })
  }

  function deleteOffer() {
    if (!loading) {
      setLoading(true)
      if (idOffer) {
        patchOffer({ enabled: false }, idOffer).then((response) => {
          if (response.ok) {
            refetch()
          }
          flushSync(() => {
            setLoading(false)
            close()
          })
        })
      } else {
        setLoading(false)
        close()
      }
    }
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
        <article>
          <div data-img>
            <img src="/svg/trash-accent.svg" alt="trash" width={20} height={20} />
          </div>
          <h2>Вы хотите удалить предложение?</h2>
        </article>
        <footer>
          <Button type="button" typeButton="fill-primary" label="Да, удалить" onClick={deleteOffer} loading={loading} />
          <Button type="button" typeButton="regular-primary" label="Нет, оставить" onClick={close} loading={loading} />
        </footer>
      </section>
    </div>
  )
}
