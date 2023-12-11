"use client"

import { useState } from "react"
import { isMobile } from "react-device-detect"

import type { TServices } from "./types/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { ServicesComponent } from "./components/Services"
import { SearchField } from "@/components/common/Inputs"
import { Segments } from "@/components/common/Segments"
import { GlassesBanner } from "@/components/common/Glasses"

import { SERVICES } from "./constants"

import styles from "./styles/style.module.scss"

export const BannerServices = () => {
    const [activeService, setActiveService] = useState<ISegmentValues<TServices>>(SERVICES[0])
    const [total, setTotal] = useState(0)

    function onSearch(value: string) {}

    return !isMobile ? (
        <div className={styles.container}>
            <ul>
                <header>
                    <Segments VALUES={SERVICES} active={activeService} setActive={setActiveService} type="primary" />
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
                    <ServicesComponent type={activeService.value} setTotal={setTotal} />
                </div>
            </ul>
            <GlassesBanner />
        </div>
    ) : null
}
