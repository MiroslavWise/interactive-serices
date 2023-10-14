"use client"

import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"

import type { TContainerSuggestions } from "./types/types"

import { MotionUL } from "@/components/common/Motion"
import { CardSuggestion } from "@/components/common/Card"

import { useAuth } from "@/store/hooks"
import { serviceOffer } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const ContainerSuggestions: TContainerSuggestions = ({
    isOfferOrRequest,
}) => {
    const { userId, user, imageProfile } = useAuth()

    const { data, refetch } = useQuery({
        queryFn: () =>
            serviceOffer.getUserId(userId!, { provider: isOfferOrRequest }),
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
                          rating={{
                              average: 4.5,
                              total: 21,
                          }}
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
