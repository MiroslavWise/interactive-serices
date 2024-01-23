"use client"

import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"

import type { IValuesCategories, IMainAndSubCategories } from "./types/types"

import { Button } from "@/components/common"
import { ItemCategory } from "./components/ItemCategory"

import { serviceUser } from "@/services"
import { dispatchChangeService, useAuth, useChangeService, useOffersCategories } from "@/store"

import styles from "./styles/style.module.scss"

export const ChangeService = () => {
    const [loading, setLoading] = useState(false)
    const userId = useAuth(({ userId }) => userId)
    const visible = useChangeService(({ visible }) => visible)
    const categories = useOffersCategories(({ categories }) => categories)

    const { register, watch, handleSubmit, setValue } = useForm<IValuesCategories>({
        defaultValues: {
            "search-categories": "",
            categories: [],
        },
    })

    const { data, refetch } = useQuery({
        queryFn: () => serviceUser.getId(userId!),
        queryKey: ["user", { userId: userId }],
        enabled: !!userId,
    })

    useEffect(() => {
        if (data?.res && data?.res?.categories?.length > 0) {
            setValue(
                "categories",
                data?.res?.categories?.map((item) => item?.id!),
            )
        }
    }, [data])

    const onSubmit = handleSubmit(submit)

    const categoriesMainSub = useMemo(() => {
        if (categories?.length > 0) {
            const array: IMainAndSubCategories[] = []

            for (const item of categories) {
                if (item?.provider === "main") {
                    array?.push({ main: item, subs: [] })
                }
            }

            for (const item of categories) {
                const main = array?.find((item_) => item_?.main?.slug === item.provider)
                if (main) {
                    main.subs.push(item)
                }
            }

            return array
        } else {
            return []
        }
    }, [categories])

    const filter: IMainAndSubCategories[] = useMemo(() => {
        return categoriesMainSub.filter(
            (item) =>
                item?.main?.title?.toLowerCase()?.includes(watch("search-categories")?.toLowerCase()?.trim()) ||
                item?.subs?.some((item_) => item_?.title?.toLowerCase()?.includes(watch("search-categories")?.toLowerCase()?.trim())),
        )
    }, [watch("search-categories"), categoriesMainSub])

    const selectedCategories = useMemo(() => {
        return categories?.filter((item) => watch("categories")?.includes(item?.id!))
    }, [watch("categories"), categories])

    function submit(values: IValuesCategories) {
        if (!loading) {
            setLoading(true)
            if (JSON.stringify(watch("categories")?.sort()) === JSON.stringify(data?.res?.categories?.map((item) => item.id)?.sort())) {
                setLoading(false)
                dispatchChangeService({ visible: false })
            } else {
                serviceUser.patch({ categories: values.categories || [] }, userId!).then((response) => {
                    if (response.ok) {
                        refetch()
                        setLoading(false)
                        dispatchChangeService({ visible: false })
                    } else {
                        setLoading(false)
                        dispatchChangeService({ visible: false })
                    }
                })
            }
        }
    }

    return (
        <div className={styles.wrapper} data-active={visible} data-blur-modal>
            <section>
                <header>
                    <a
                        onClick={(event) => {
                            event.stopPropagation()
                            dispatchChangeService({ visible: false })
                        }}
                    >
                        <img src="/svg/arrow-left.svg" alt="<=" width={24} height={24} />
                    </a>
                    <h2>Добавить услуги</h2>
                </header>
                <ul>
                    <form className={styles.form} onSubmit={onSubmit}>
                        <span>Чтобы увидеть все услуги, раскройте категорию. Вы можете выбрать не более {5 - (watch("categories")?.length || 0)} услуг.</span>
                        <div data-search>
                            <input {...register("search-categories")} placeholder="Найти услугу" type="text" list="search" autoComplete="off" />
                            <img src="/svg/search-md.svg" alt="search" width={20} height={20} data-search />
                            <img
                                src="/svg/x-close.svg"
                                alt="clear"
                                width={20}
                                height={20}
                                data-clear={!!watch("search-categories")}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    setValue("search-categories", "")
                                }}
                            />
                            <datalist id="search">
                                {categories.map((item) => (
                                    <option key={`::category::list::data::${item.id}::`} value={item.title} />
                                ))}
                            </datalist>
                        </div>
                        <div data-categories-selected={selectedCategories.length > 0}>
                            {selectedCategories.map((item) => (
                                <a key={`::selected::item::${item.id}::`}>
                                    <span>{item.title}</span>
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            setValue(
                                                "categories",
                                                watch("categories").filter((item_) => item_ !== item.id),
                                            )
                                        }}
                                    >
                                        <img src="/svg/x-close-white.svg" alt="x" width={16} height={16} />
                                    </button>
                                </a>
                            ))}
                        </div>
                        <section {...register("categories")}>
                            {filter.map((item) => (
                                <ItemCategory key={`::main::category::${item?.main?.id}::`} {...item} setValue={setValue} idsActive={watch("categories")} />
                            ))}
                        </section>
                        <footer>
                            <Button type="submit" typeButton="fill-primary" label="Добавить" loading={loading} />
                        </footer>
                    </form>
                </ul>
            </section>
        </div>
    )
}
