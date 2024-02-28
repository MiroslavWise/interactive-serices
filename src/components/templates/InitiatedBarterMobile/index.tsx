import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import { IconChevron } from "@/components/icons/IconChevron"
import { CardBarter, LoadingBarters } from "@/components/common"

import { cx } from "@/lib/cx"
import { getBarterUserIdReceiver } from "@/services"
import { dispatchInitiatedBarter, useAuth, useInitiatedBarter } from "@/store"

import styles from "./style.module.scss"

export function InitiatedBarterMobile() {
  const userId = useAuth(({ userId }) => userId)
  const visible = useInitiatedBarter(({ visible }) => visible)

  const { data, isLoading } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(userId!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: userId, status: EnumStatusBarter.INITIATED }],
    enabled: visible && !!userId,
  })

  const counts = useMemo(() => {
    if (!data?.res || !data?.res?.length) return null

    return data?.res?.length || 0
  }, [data?.res])

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <header>
        <button
          onClick={(event) => {
            event.stopPropagation()
            dispatchInitiatedBarter(false)
          }}
        >
          <IconChevron />
        </button>
        <h3>Предложения обменов</h3>
      </header>
      <ul>
        {counts ? <span>{counts} новых предложения</span> : null}
        {isLoading ? (
          [1, 2, 3].map((item) => <LoadingBarters key={`::item::load::barter::${item}::`} />)
        ) : !!counts ? (
          data?.res?.map((item) => <CardBarter key={`::key::item::barter::`} barter={item} />)
        ) : (
          <p>У вас нет предложений по обмену от пользователей</p>
        )}
      </ul>
    </div>
  )
}
