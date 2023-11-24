"use client"

import { isMobile } from "react-device-detect"
import { motion } from "framer-motion"
import { useState, useMemo, type ReactNode, memo } from "react"

import type { TServices } from "./types/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { SearchField } from "@/components/common/Inputs"
import { Segments } from "@/components/common/Segments"
import { GlassesBanner } from "@/components/common/Glasses"
import { ServicesComponent } from "./components/Services"

import { SERVICES } from "./constants"
import { useAuth } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const BannerServices = () => {
    const { token } = useAuth((_) => ({ token: _.token }))
    const [activeService, setActiveService] = useState<
        ISegmentValues<TServices>
    >(SERVICES[0])
    const [total, setTotal] = useState(0)

    function onSearch(value: string) {}

    return !isMobile ? (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.8 }}
            style={{
                top: !!token ? 24 + 77 : 24,
                height: !!token
                    ? `calc(100% - 48px - 77px)`
                    : `calc(100% - 48px)`,
            }}
        >
            <header>
                <Segments
                    VALUES={SERVICES}
                    active={activeService}
                    setActive={setActiveService}
                    type="primary"
                />
            </header>
            <div data-title-search>
                <h2>Меняйте услуги на услуги. Помогайте другим. Общайтесь.</h2>
                <SearchField onSearch={onSearch} />
            </div>
            <div data-container>
                <section>
                    <h3>Популярное рядом</h3>
                    {total ? (
                        <div data-total>
                            <span>{total}</span>
                        </div>
                    ) : null}
                </section>
                <ServicesComponent
                    type={activeService.value}
                    setTotal={setTotal}
                />
            </div>
            <GlassesBanner />
        </motion.div>
    ) : null
}
