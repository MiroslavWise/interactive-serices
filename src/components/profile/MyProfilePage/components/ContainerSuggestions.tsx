"use client"

import { useQuery } from "@tanstack/react-query"

import type { TContainerSuggestions } from "./types/types"

import { LoadingMyOffer } from "@/components/common"
import { CardSuggestion, CardDiscussion } from "@/components/common/Card"

import { serviceOffers } from "@/services"
import { useAuth, useProviderProfileOffer } from "@/store"

import styles from "./styles/style.module.scss"

export const ContainerSuggestions: TContainerSuggestions = () => {
    const stateProvider = useProviderProfileOffer(({ stateProvider }) => stateProvider)
    const userId = useAuth(({ userId }) => userId)

    const { data, refetch, isLoading } = useQuery({
        queryFn: () => serviceOffers.getUserId(userId!, { provider: stateProvider, order: "DESC" }),
        queryKey: ["offers", { userId: userId, provider: stateProvider }],
        enabled: !!userId!,
    })

    return (
        <ul className={styles.containerSuggestions} data-loading={isLoading} data-length={data?.res?.length === 0}>
            {isLoading ? (
                [1, 2, 3, 4].map((item) => <LoadingMyOffer key={`::item::my::offer::loading::${item}::`} />)
            ) : data?.res && Array.isArray(data?.res) && ["offer"].includes(stateProvider) && data?.res?.length > 0 ? (
                data?.res
                    ?.filter((item) => item?.addresses?.length > 0)
                    .map((item, index) => <CardSuggestion key={`${item.id}+${index}-${stateProvider}`} {...item} refetch={refetch} />)
            ) : data?.res && Array.isArray(data?.res) && ["discussion", "alert"].includes(stateProvider) && data?.res?.length > 0 ? (
                data?.res.map((item) => <CardDiscussion key={`${item.id}-${item.provider}`} {...item} />)
            ) : (
                <article>
                    <h3>
                        У вас пока нет{" "}
                        {stateProvider === "offer"
                            ? "предложений"
                            : stateProvider === "discussion"
                            ? "дискуссий"
                            : stateProvider === "alert"
                            ? "объявлений"
                            : ""}
                    </h3>
                    <p>Здесь будут появляться уведомления, требующего вашего ответа. Например, ответить состоялся ли обмен или написать отзыв.</p>
                </article>
            )}
        </ul>
    )
}
