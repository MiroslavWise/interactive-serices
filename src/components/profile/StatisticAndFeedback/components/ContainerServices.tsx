"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
//@ts-ignore
import Masonry from "react-responsive-masonry"

import { EnumTypeProvider } from "@/types/enum"
import type { TContainerServices } from "./types/types"

import { ServiceLoading } from "@/components/common"
import CardBallon from "@/components/common/Card/CardBallon"

import { useResize } from "@/helpers"
import { getUserIdOffers } from "@/services"

import styles from "./styles/style.module.scss"

export const ContainerServices: TContainerServices = ({}) => {
  const id = useSearchParams().get("id")
  const { isTablet } = useResize()

  const { data: dataOffer, isLoading } = useQuery({
    queryFn: () => getUserIdOffers(id!, { provider: EnumTypeProvider.offer }),
    queryKey: ["offers", { userId: id, provider: EnumTypeProvider.offer }],
    enabled: !!id,
  })

  const list = useMemo(() => {
    return dataOffer?.res?.filter((item) => item?.addresses?.length > 0) || []
  }, [dataOffer?.res])

  return (
    <section className={styles.containerServices} data-loading={isLoading}>
      {isLoading ? (
        [1, 2, 3, 4].map((item) => <ServiceLoading key={`::item::offers::user::page::${item}::`} />)
      ) : isTablet ? (
        <ul className={styles.containerRequestsAndProposals}>
          {list?.map((item) => (
            <CardBallon key={`::offer::general::${item.id}::`} offer={item} />
          ))}
        </ul>
      ) : (
        <Masonry gutter="16px" columnsCount={2}>
          {list?.map((item) => (
            <CardBallon key={`::offer::general::${item.id}::`} offer={item} />
          ))}
        </Masonry>
      )}
    </section>
  )
}
