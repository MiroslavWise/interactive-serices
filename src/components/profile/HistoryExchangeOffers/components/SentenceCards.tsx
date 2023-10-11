"use client"

import { useId } from "react"
import { useQuery } from "react-query"

import type { TSentenceCards } from "./types/types"

import { CardOffer } from "@/components/common/Card/Offer"
import { MotionUL } from "@/components/common/Motion"

import { serviceProfile } from "@/services/profile"

import styles from "./styles/style.module.scss"
import dayjs from "dayjs"

export const SentenceCards: TSentenceCards = ({ value }) => {
    const id = useId()
    const { data, isLoading, error } = useQuery(["profiles"], () =>
        serviceProfile.get({ limit: 20 }),
    )

    return (
        <MotionUL classNames={[styles.containerCards]}>
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
