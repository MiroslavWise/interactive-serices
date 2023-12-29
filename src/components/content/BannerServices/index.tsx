"use client"

import { useRef, useState } from "react"
import { isMobile } from "react-device-detect"

import type { TServices } from "./types/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { ServicesComponent } from "./components/Services"
import { SearchField, Segments } from "@/components/common"

import { SERVICES } from "./constants"

import styles from "./styles/style.module.scss"

export const BannerServices = () => {
    const [activeService, setActiveService] = useState<ISegmentValues<TServices>>(SERVICES[0])
    const [total, setTotal] = useState(0)
    const parentRef = useRef<HTMLUListElement>(null)

    function onSearch(value: string) {}

    return !isMobile ? (
        <div className={styles.container}>
            <ul ref={parentRef}>
                <header>
                    <Segments VALUES={SERVICES} active={activeService} setActive={setActiveService} type="primary" isBorder />
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
                    <ServicesComponent type={activeService.value} setTotal={setTotal} parentRef={parentRef.current} />
                </div>
            </ul>
        </div>
    ) : null
}
