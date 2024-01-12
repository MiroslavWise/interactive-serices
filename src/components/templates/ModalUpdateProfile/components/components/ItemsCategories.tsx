import { useQuery } from "@tanstack/react-query"
import { SyntheticEvent, useMemo, useState } from "react"

import { Button } from "@/components/common"

import { IconCategory } from "@/lib/icon-set"
import { serviceUsers } from "@/services/users"
import { useOutsideClickEvent } from "@/helpers"
import { useAuth, useOffersCategories } from "@/store/hooks"

import styles from "./styles/items-categories.module.scss"

export function ItemsCategories() {
    const userId = useAuth(({ userId }) => userId)
    const categories = useOffersCategories(({ categories }) => categories)
    const [isSelection, setIsSelection] = useState(false)
    const [search, setSearch] = useState("")
    const [isList, setIsList, ref] = useOutsideClickEvent()

    const { data, refetch } = useQuery({
        queryFn: () => serviceUsers.getId(userId!),
        queryKey: ["user", `userId=${userId}`],
        enabled: !!userId,
    })

    const categoriesUser = useMemo(() => data?.res?.categories || [], [data?.res?.categories])

    async function deleteCategory(id: number) {
        const ids = categoriesUser.filter((item) => item.id !== id).map((item) => item.id)

        return serviceUsers.patch({ categories: ids.sort() }, userId!).then((response) => {
            console.log("response user categories: ", response)
            if (response.ok) {
                requestAnimationFrame(() => {
                    refetch()
                })
            }
        })
    }

    async function updateUsersCategories(id: number) {
        let ids = categoriesUser.map((item) => item.id)
        if (ids.includes(id)) {
            ids = ids.filter((item) => item !== id)
        } else {
            ids.push(id)
        }
        return serviceUsers.patch({ categories: ids.sort() }, userId!).then((response) => {
            console.log("response user categories: ", response)
            if (response.ok) {
                requestAnimationFrame(() => {
                    refetch()
                })
            }
        })
    }

    const filterCategories = useMemo(
        () =>
            categories
                ?.filter((item) => item.title?.toLowerCase()?.includes(search.toLowerCase().trim()))
                ?.filter((item) => !categoriesUser.some((_) => item.id === _.id)),
        [categories, search, categoriesUser],
    )

    return (
        <div className={styles.container}>
            {categoriesUser.map((item) => (
                <div data-item-category key={`${item?.id}`}>
                    <img
                        src={IconCategory(item.id)}
                        alt={`${item.id!}`}
                        width={28}
                        height={28}
                        onError={(error: any) => {
                            if (error?.target) {
                                try {
                                    error.target.src = IconCategory(item.id)
                                } catch (e) {
                                    console.log("catch e: ", e)
                                }
                            }
                        }}
                    />
                    <p>{item.title}</p>
                    <button data-close type="button" onClick={() => deleteCategory(item.id)}>
                        <img src="/svg/x-close.svg" alt="x" width={30} height={30} />
                    </button>
                </div>
            ))}
            {isSelection && categoriesUser.length < 5 ? (
                <div data-div-select ref={ref}>
                    <input
                        placeholder="Выберите услуги, которые вы хотите"
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value)
                        }}
                        onFocus={(event) => {
                            event.stopPropagation()
                            setIsList(true)
                        }}
                    />
                    {isList ? (
                        filterCategories.length ? (
                            <ul
                                data-list
                                onClick={(event) => {
                                    event.stopPropagation()
                                }}
                            >
                                {filterCategories.map((item) => (
                                    <li
                                        key={`::${item.id}::filter::`}
                                        onClick={() => updateUsersCategories(item.id)}
                                        data-active={categoriesUser.some((_) => _.id === item.id)}
                                    >
                                        <p>{item.title}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div data-list>
                                <h4>По вашему запросу нет подходящих услуг</h4>
                            </div>
                        )
                    ) : null}
                </div>
            ) : null}
            {categoriesUser.length < 5 && (
                <Button type="button" typeButton="regular-primary" label="Добавить" onClick={() => setIsSelection(true)} />
            )}
        </div>
    )
}
