"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
//@ts-ignore
import Masonry from "react-responsive-masonry"

import type { TContainerServices } from "./types/types"

import { ServiceLoading } from "@/components/common"
import { GeneralServiceAllItem } from "@/components/common/Card"
import { GeneralOffer } from "@/components/common/Card/GeneralServiceAllItem"

import { getUserIdOffers } from "@/services"

import styles from "./styles/style.module.scss"

export const ContainerServices: TContainerServices = ({}) => {
  const id = useSearchParams().get("id")

  const { data: dataOffer, isLoading } = useQuery({
    queryFn: () => getUserIdOffers(id!, { provider: "offer" }),
    queryKey: ["offers", { userId: id, provider: "offer" }],
    enabled: !!id,
  })

  const list = useMemo(() => {
    return dataOffer?.res?.filter((item) => item?.addresses?.length > 0) || []
  }, [dataOffer?.res])

  return (
    <section className={styles.containerServices} data-loading={isLoading}>
      {isLoading ? (
        [1, 2, 3, 4].map((item) => <ServiceLoading key={`::item::offers::user::page::${item}::`} />)
      ) : isMobile ? (
        <ul className={styles.containerRequestsAndProposals}>
          {list?.map((item) => {
            if (item.provider === "offer") return <GeneralOffer key={`::${item?.id}::item::key::offer::`} offer={item} />
            return <GeneralServiceAllItem key={`::${item?.id}::item::key::offer::`} {...item} />
          })}
        </ul>
      ) : (
        <Masonry gutter="16px" columnsCount={2}>
          {list.map((item) => {
            if (item.provider === "offer") return <GeneralOffer key={`::${item?.id}::item::key::offer::`} offer={item} />
            return <GeneralServiceAllItem key={`::${item?.id}::item::key::offer::`} {...item} />
          })}
        </Masonry>
      )}
    </section>
  )
}
