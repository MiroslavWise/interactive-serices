"use client"

import { useQuery } from "@tanstack/react-query"

import type { TContainerSuggestions } from "./types/types"

import { CardSuggestion } from "@/components/common/Card"

import { useAuth } from "@/store/hooks"
import { serviceOffers } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const ContainerSuggestions: TContainerSuggestions = () => {
    const userId = useAuth(({ userId }) => userId)
    const user = useAuth(({ user }) => user)
    const imageProfile = useAuth(({ imageProfile }) => imageProfile)

    const { data, refetch } = useQuery({
        queryFn: () => serviceOffers.getUserId(userId!, { provider: "offer" }),
        queryKey: ["offers", `user=${userId}`, `provider=offer`],
    })

    return (
        <ul className={styles.containerSuggestions}>
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
        </ul>
    )
}
