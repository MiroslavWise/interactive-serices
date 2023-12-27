"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import type { TCustomSelect, TValue } from "./types"

import { ImageStatic } from "../../Image"

import styles from "./style.module.scss"

export const CustomSelect: TCustomSelect = ({ placeholder, list = [], value, setValue, disabled, focus }) => {
    const [valueInput, setValueInput] = useState("")
    const [isOptionsVisible, setOptionsVisible] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)
    function handleOptions() {
        setOptionsVisible(true)
    }

    function handleValue(valueId: TValue) {
        setValue(valueId)
        setValueInput(list?.find((item) => item?.value === valueId)?.label!)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setOptionsVisible(false)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    const filters = useMemo(() => {
        return list?.filter((item) => item?.label?.toLowerCase()?.includes(valueInput?.toLowerCase())) || []
    }, [valueInput, list])

    return (
        <div className={styles.container} ref={selectRef}>
            <div data-input-selector data-focus={focus}>
                <input
                    placeholder={placeholder}
                    value={valueInput}
                    onChange={(event) => {
                        setValueInput(event.target.value)
                    }}
                    onFocus={(event) => {
                        event.stopPropagation()
                        handleOptions()
                    }}
                    disabled={disabled}
                />
                <img src="/svg/chevron-down.svg" alt="chevron-down" width={20} height={20} data-active={isOptionsVisible} />
            </div>
            <div data-list data-active={isOptionsVisible}>
                <ul>
                    {filters?.length ? (
                        filters.map((item, index) => (
                            <li
                                key={`${item.value}_${index}`}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    setOptionsVisible(false)
                                    handleValue(item.value)
                                }}
                            >
                                {item?.prefix ? (
                                    <div className={styles.containerImage}>
                                        <ImageStatic src={item?.prefix} alt="prefix-alt" width={16} height={16} />
                                    </div>
                                ) : null}
                                <p>{item.label}</p>
                            </li>
                        ))
                    ) : (
                        <p></p>
                    )}
                </ul>
            </div>
        </div>
    )
}
