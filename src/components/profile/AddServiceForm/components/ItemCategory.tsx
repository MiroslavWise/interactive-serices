import { memo, useState } from "react"
import { UseFormSetValue } from "react-hook-form"

import type { IMainAndSubCategories, IValuesCategories } from "../types/types"

import { IconCategory } from "@/lib/icon-set"

export const ItemCategory = memo(function ItemCategory(
    props: IMainAndSubCategories & { setValue: UseFormSetValue<IValuesCategories>; idsActive: number[] },
) {
    const { main, subs, idsActive, setValue } = props ?? {}
    const [expand, setExpand] = useState(false)

    return (
        <a
            data-active={idsActive?.some((item) => main?.id === item) || subs.some((item) => idsActive?.some((_) => _ === item?.id))}
            data-expand={expand}
        >
            <div data-main>
                <div
                    data-check={idsActive?.some((item) => main?.id === item)}
                    onClick={(event) => {
                        event.stopPropagation()
                        if (idsActive?.includes(main.id)) {
                            setValue(
                                "categories",
                                idsActive.filter((item_) => item_ !== main?.id),
                            )
                        } else {
                            setValue("categories", [...idsActive, main.id])
                        }
                    }}
                >
                    <img src="/svg/check-white.svg" alt="+" />
                </div>
                <span
                    onClick={(event) => {
                        event.stopPropagation()
                        setExpand((prev) => !prev)
                    }}
                >
                    <div data-img>
                        <img
                            src={IconCategory(main.id!)}
                            alt="cat"
                            height={16}
                            width={16}
                            onError={(error: any) => {
                                if (error?.target) {
                                    try {
                                        error.target.src = `/svg/category/default.svg`
                                    } catch (e) {
                                        console.log("catch e: ", e)
                                    }
                                }
                            }}
                        />
                    </div>
                    <p>{main.title}</p>
                    <img data-img-expand src="/svg/chevron-down-gray.svg" alt="down" width={24} height={24} />
                </span>
            </div>
            <div data-subs>
                {subs.map((item) => (
                    <div
                        key={`::item::sub::category::${item?.id!}::`}
                        data-item
                        data-active={idsActive.includes(item?.id!)}
                        onClick={(event) => {
                            event.stopPropagation()
                            if (idsActive?.includes(item.id)) {
                                setValue(
                                    "categories",
                                    idsActive.filter((item_) => item_ !== item?.id),
                                )
                            } else {
                                setValue("categories", [...idsActive, item.id])
                            }
                        }}
                    >
                        <div data-check>{idsActive.includes(item?.id!) ? <img src="/svg/check-white.svg" alt="+" /> : null}</div>
                        <span>
                            <div data-img>
                                <img
                                    src={IconCategory(item.id!)}
                                    alt="cat"
                                    height={16}
                                    width={16}
                                    onError={(error: any) => {
                                        if (error?.target) {
                                            try {
                                                error.target.src = `/svg/category/default.svg`
                                            } catch (e) {
                                                console.log("catch e: ", e)
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <p>{item.title}</p>
                        </span>
                    </div>
                ))}
            </div>
        </a>
    )
})
