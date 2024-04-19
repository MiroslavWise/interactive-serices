"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"

import { Button } from "@/components/common"

import { getUserIdOffers, patchOffer } from "@/services"
import { useDeleteOffer, dispatchDeleteOffer, useAuth } from "@/store"

function DeleteOffer() {
  const userId = useAuth(({ userId }) => userId)
  const idOffer = useDeleteOffer(({ idOffer }) => idOffer)

  const [loading, setLoading] = useState(false)

  const { refetch } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: EnumTypeProvider.offer, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: EnumTypeProvider.offer }],
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
          requestAnimationFrame(() => {
            setLoading(false)
            close()
          })
        })
      } else {
        requestAnimationFrame(() => {
          setLoading(false)
          close()
        })
      }
    }
  }

  return (
    <>
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
    </>
  )
}

DeleteOffer.displayName = "DeleteOffer"
export default DeleteOffer
