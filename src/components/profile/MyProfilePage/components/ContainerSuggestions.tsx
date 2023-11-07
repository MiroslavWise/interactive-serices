"use client"

import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { TContainerSuggestions } from "./types/types"

import { MotionUL } from "@/components/common/Motion"
import { CardSuggestion } from "@/components/common/Card"

import { useAuth } from "@/store/hooks"
import { serviceOffers } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const ContainerSuggestions: TContainerSuggestions = ({
    isOfferOrRequest,
}) => {
    const { userId, user, imageProfile } = useAuth()

    const { data, refetch } = useQuery({
        queryFn: () =>
            serviceOffers.getUserId(userId!, { provider: isOfferOrRequest }),
        queryKey: ["offers", `user=${userId}`, `provider=${isOfferOrRequest}`],
    })

    return (
        <MotionUL
            classNames={[styles.containerSuggestions]}
            data={{
                "data-mobile": isMobile,
            }}
        >
            {Array.isArray(data?.res)
                ? data?.res.map((item, index) => (
                      <CardSuggestion
                          key={`${item.id}+${index}-offers`}
                          {...item}
                          profile={{
                              name: `${user?.firstName || ""} ${
                                  user?.lastName || ""
                              }`,
                              userId: userId!,
                              photo: imageProfile?.attributes?.url!,
                          }}
                          refetch={refetch}
                      />
                  ))
                : null}
        </MotionUL>
    )
}
