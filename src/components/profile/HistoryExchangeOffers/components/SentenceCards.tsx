"use client"

import dayjs from "dayjs"
import { useId } from "react"
import { useQuery } from "react-query"

import type { TSentenceCards } from "./types/types"

import { MotionUL } from "@/components/common/Motion"
import { CardOffer } from "@/components/common/Card/Offer"

import { useAuth } from "@/store/hooks"
import { serviceBarters } from "@/services/barters"

import styles from "./styles/style.module.scss"

export const SentenceCards: TSentenceCards = ({ value }) => {
    const { userId } = useAuth()
    const { data } = useQuery({
        queryFn: () =>
            serviceBarters.get({ status: value.value, user: userId! }),
        queryKey: ["barters", `user=${userId}`, `status=${value.value}`],
    })

    return (
        <MotionUL classNames={[styles.containerCards]}>
            {Array.isArray(data?.res)
                ? data?.res?.map((item) => (
                      <CardOffer
                          key={`${item.id}-history-page-${item.status}`}
                          {...item}
                      />
                  ))
                : null}
            <></>
            {/* {data?.ok
                ? data?.res?.map((item) => (
                      <CardOffer
                          key={`${item.userId}_card_offer`}
                          name={`${item.firstName || ""} ${
                              item.lastName || ""
                          }`}
                          chatId={item.userId}
                          photo={item?.image?.attributes?.url!}
                          finality={Math.random() < 0.5}
                          price={400}
                          date={
                              item?.created
                                  ? dayjs(item.created).format("DD/MM/YYYY")
                                  : "Not Date"
                          }
                          geo="Владимирский спуск, 15, Владимир"
                          rating={item.id}
                          {...item}
                      />
                  ))
                : null} */}
        </MotionUL>
    )
}
