"use client"

import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"

import type { IValuesCategories, IMainAndSubCategories } from "./types/types"

import { Button } from "@/components/common"
import { ItemCategory } from "./components/ItemCategory"

import { usePush } from "@/helpers"
import { serviceUser } from "@/services/users"
import { useAuth, useOffersCategories } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const AddServiceForm = () => {
    const [loading, setLoading] = useState(false)
    const userId = useAuth(({ userId }) => userId)
    const categories = useOffersCategories(({ categories }) => categories)
    const { handlePush } = usePush()

    const { register, watch, handleSubmit, setValue } = useForm<IValuesCategories>({
        defaultValues: {
            "search-categories": "",
            categories: [],
        },
    })

    const { data, refetch } = useQuery({
        queryFn: () => serviceUser.getId(userId!),
        queryKey: ["user", userId!],
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
                handlePush("/profile-change")
            } else {
                serviceUser.patch({ categories: watch("categories") || [] }, userId!).then((response) => {
                    if (response.ok) {
                        refetch().then(() => {
                            setLoading(false)
                            handlePush(`/profile-change`)
                        })
                    } else {
                        setLoading(false)
                        handlePush(`/profile-change`)
                    }
                })
            }
        }
    }

    return (
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
            <section {...register("categories")}>
                {filter.map((item) => (
                    <ItemCategory key={`::main::category::${item?.main?.id}::`} {...item} setValue={setValue} idsActive={watch("categories")} />
                ))}
            </section>
            <footer>
                <Button type="submit" typeButton="fill-primary" label="Добавить" loading={loading} />
                {selectedCategories?.length > 0 ? (
                    <p>
                        Выбрано: <span>{selectedCategories?.map((item) => item.title)?.join(", ")}</span>
                    </p>
                ) : null}
            </footer>
        </form>
    )
}
