"use client"

import { useId } from "react"
import Image from "next/image"

import type { TSelectors } from "./types"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers/hooks/useOutsideClickEvent"

import styles from "./style.module.scss"

export const Selectors: TSelectors = ({
    options,
    label,
    watchField,
    set,
    param,
    register,
}) => {
    const idSelect = useId()
    const [isOpen, setIsOpen, dropdownRef] = useOutsideClickEvent()
    const handleOptions = () => setIsOpen((prev) => !prev)

    return (
        <div
            className={styles.container}
            onClick={handleOptions}
            ref={dropdownRef}
        >
            <span
                className={cx(
                    isOpen && styles.isOpen,
                    watchField && styles.value,
                )}
                {...register}
            >
                {watchField
                    ? options.find(
                          (item) => Number(item.value) === Number(watchField),
                      )?.label
                    : label}
            </span>
            <Image
                src="/svg/chevron-down.svg"
                alt="chevron-down"
                width={20}
                height={20}
                className={cx(styles.chevron, isOpen && styles.active)}
            />
            <ul className={cx(isOpen && styles.active)}>
                {Array.isArray(options)
                    ? options?.map((item) => (
                          <li
                              key={`${item.value}_${idSelect}`}
                              className={cx(
                                  item?.value === watchField && styles.value,
                              )}
                              onClick={() => {
                                  set(param, item.value)
                              }}
                          >
                              <p>{item.label}</p>
                          </li>
                      ))
                    : null}
            </ul>
        </div>
    )
}
