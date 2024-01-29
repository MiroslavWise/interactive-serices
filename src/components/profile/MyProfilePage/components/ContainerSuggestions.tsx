"use client"

import { useQuery } from "@tanstack/react-query"

import type { TContainerSuggestions } from "./types/types"
import type { TTypeProvider } from "@/services/file-upload/types"

import { LoadingMyOffer } from "@/components/common"
import { CardSuggestion, CardDiscussion } from "@/components/common/Card"

import { serviceOffers } from "@/services"
import { useAuth, useProviderProfileOffer } from "@/store"

import styles from "./styles/style.module.scss"

const titleEmpty: Map<TTypeProvider, string> = new Map([
    ["offer", "У вас пока нет предложений"],
    ["discussion", "У вас пока нет дискуссий"],
    ["alert", "У вас пока нет объявлений"],
])
const descriptionEmpty: Map<TTypeProvider, string> = new Map([
    ["offer", ""],
    ["discussion", ""],
    ["alert", ""],
])

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
                    <h3>{titleEmpty.has(stateProvider) ? titleEmpty.get(stateProvider) : null}</h3>
                    <p>{descriptionEmpty.has(stateProvider) ? descriptionEmpty.get(stateProvider) : null}</p>
                </article>
            )}
        </ul>
    )
}
