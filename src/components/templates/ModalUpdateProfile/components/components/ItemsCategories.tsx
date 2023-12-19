import { useQuery } from "@tanstack/react-query"
import { SyntheticEvent, useMemo, useState } from "react"

import { Button } from "@/components/common"

import { serviceUsers } from "@/services/users"
import { useAuth, useOffersCategories } from "@/store/hooks"

import styles from "./styles/items-categories.module.scss"
import { useOutsideClickEvent } from "@/helpers"

export function ItemsCategories() {
    const token = useAuth(({ token }) => token)
    const userId = useAuth(({ userId }) => userId)
    const categories = useOffersCategories(({ categories }) => categories)
    const [isSelection, setIsSelection] = useState(false)
    const [search, setSearch] = useState("")
    const [isList, setIsList, ref] = useOutsideClickEvent()

    const { data, refetch } = useQuery({
        queryFn: serviceUsers.getMe,
        queryKey: ["user", `token=${token}`],
        enabled: !!token,
    })

    const categoriesUser = useMemo(() => data?.res?.categories || [], [data?.res])

    async function updateUsersCategories(id: number) {
        let ids = categoriesUser
        if (ids.includes(id)) {
            ids = ids.filter((item) => item !== id)
        } else {
            ids.push(id)
        }
        return serviceUsers.patch({ categories: ids.sort() }, userId!).then((response) => {
            console.log("response user categories: ", response)
            if (response.ok) {
                refetch()
            }
        })
    }

    const filterCategories = useMemo(
        () => categories?.filter((item) => item.title?.toLowerCase()?.includes(search.toLowerCase().trim())),
        [categories, search],
    )

    const parseCategories = useMemo(() => {
        if (categoriesUser.length && categories.length) {
            return categories.filter((item) => categoriesUser.includes(item.id))
        }
        return []
    }, [categories, categoriesUser])

    return (
        <div className={styles.container}>
            {parseCategories.map((item) => (
                <div data-item-category key={`${item?.id}`}>
                    <img
                        src={`/svg/category/${item.id}.svg`}
                        alt={`${item.id!}`}
                        width={28}
                        height={28}
                        onError={(error: SyntheticEvent<HTMLImageElement, Event>) => {
                            if (error?.target) {
                                try {
                                    //@ts-ignore
                                    error.target.src = `/svg/category/default.svg`
                                } catch (e) {
                                    console.log("catch e: ", e)
                                }
                            }
                        }}
                    />
                    <p>{item.title}</p>
                </div>
            ))}
            {isSelection ? (
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
                            <ul data-list>
                                {filterCategories.map((item) => (
                                    <li
                                        key={`${item.id}-filter`}
                                        onClick={() => updateUsersCategories(item.id)}
                                        data-active={categoriesUser.includes(item.id)}
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
            <Button type="button" typeButton="regular-primary" label="Добавить" onClick={() => setIsSelection(true)} />
        </div>
    )
}
