"use client"

import { motion } from "framer-motion"
import { useState, useMemo, type ReactNode, memo } from "react"

import type { TServiceBanner } from "./types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Offers } from "./components/Offers"
import { Peoples } from "./components/Peoples"
import { Requests } from "./components/Requests"
import { SearchField } from "@/components/common/Inputs"
import { Segments } from "@/components/common/Segments"

import { cx } from "@/lib/cx"
import { SERVICES } from "./constants"

import styles from "./styles/style.module.scss"

const $ServiceBanner: TServiceBanner = ({ active }) => {
    const [activeService, setActiveService] = useState<ISegmentValues<string>>(
        SERVICES[0],
    )
    const [total, setTotal] = useState(0)

    const content: ReactNode = useMemo(
        () =>
            ({
                all: <Peoples setTotal={setTotal} />,
                offers: <Offers setTotal={setTotal} />,
                requests: <Requests setTotal={setTotal} />,
            })[activeService.value],
        [activeService, setTotal],
    )

    const onSearch = (value: string) => {}

    return (
        <motion.div
            id="ServiceBanner"
            className={cx(styles.container, active && styles.active)}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.8 }}
        >
            <div className={styles.sectionSegments}>
                <Segments
                    VALUES={SERVICES}
                    active={activeService}
                    setActive={setActiveService}
                    type="primary"
                />
            </div>
            <div className={styles.titleAndSearch}>
                <h2>Меняйте услуги на услуги. Помогайте другим. Общайтесь.</h2>
                <SearchField onSearch={onSearch} />
            </div>
            <div className={styles.peopleContainer}>
                <div className={styles.titleWrapper}>
                    <h3>Популярное рядом</h3>
                    {total ? (
                        <div className={styles.totalOval}>
                            <span>{total}</span>
                        </div>
                    ) : null}
                </div>
                {content}
            </div>
            <span className={styles.glassShadowOne} />
            <span className={styles.glassShadowTwo} />
            <span className={styles.glassShadowThree} />
        </motion.div>
    )
}

export const ServiceBanner = memo($ServiceBanner)
