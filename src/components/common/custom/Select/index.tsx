"use client"

import Image from "next/image"
import { useEffect, useId, useRef, useState } from "react"

import type { TCustomSelect, TValue } from "./types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"
import { ImageStatic } from "../../Image"

export const CustomSelect: TCustomSelect = ({
    placeholder,
    list,
    value,
    setValue,
}) => {
    const id = useId()
    const [isOptionsVisible, setOptionsVisible] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)
    function handleOptions() {
        setOptionsVisible((prev) => !prev)
    }
    function handleValue(value: TValue) {
        setValue(value)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setOptionsVisible(false)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])
    return (
        <div
            className={styles.container}
            onClick={handleOptions}
            ref={selectRef}
        >
            <span className={cx(value && styles.value)}>
                {value
                    ? list?.find((item) => item?.value === value)?.label
                    : placeholder}
            </span>
            <Image
                src="/svg/chevron-down.svg"
                alt="chevron-down"
                width={20}
                height={20}
                className={cx(
                    styles.chevron,
                    isOptionsVisible && styles.active,
                )}
            />
            <ul className={cx(isOptionsVisible && styles.active)}>
                {list &&
                    list.map((item, index) => (
                        <li
                            key={`${item.value}_${index}_${id}`}
                            className={cx(
                                item?.value === value && styles.value,
                            )}
                            onClick={() => handleValue(item.value)}
                        >
                            {item?.prefix ? (
                                <div className={styles.containerImage}>
                                    <ImageStatic
                                        src={item?.prefix}
                                        alt="prefix-alt"
                                        classNames={[]}
                                        width={16}
                                        height={16}
                                    />
                                </div>
                            ) : null}
                            <p>{item.label}</p>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
