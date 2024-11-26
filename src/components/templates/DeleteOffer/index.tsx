"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"

import Button from "@/components/common/Button"

import { getUserIdOffers, patchOffer } from "@/services"
import { useDeleteOffer, dispatchDeleteOffer, useAuth } from "@/store"

const title: Map<EnumTypeProvider, string> = new Map([
  [EnumTypeProvider.offer, "предложение"],
  [EnumTypeProvider.discussion, "обсуждение"],
  [EnumTypeProvider.alert, "SOS-сообщение"],
])

function DeleteOffer() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const idOffer = useDeleteOffer(({ idOffer }) => idOffer)
  const provider = useDeleteOffer(({ provider }) => provider)

  const [loading, setLoading] = useState(false)

  const { refetch } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: provider!, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: provider! }],
    enabled: false,
  })

  function close() {
    dispatchDeleteOffer({ visible: false, idOffer: null, provider: null })
  }

  function deleteOffer() {
    if (!loading) {
      setLoading(true)
      if (idOffer) {
        patchOffer({ enabled: false }, idOffer).then((response) => {
          if (response.ok) {
            refetch()
          }
          setTimeout(() => {
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
    <>
      <article>
        <div data-img>
          <img src="/svg/trash-accent.svg" alt="trash" width={20} height={20} />
        </div>
        <h2>Вы хотите удалить {title.has(provider!) ? title.get(provider!) : null}?</h2>
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
