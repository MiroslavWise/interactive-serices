"use client"

import { useRef, useState } from "react"
import { isMobile } from "react-device-detect"

import { ServicesComponent } from "./components/Services"
import { SearchField, Segments } from "@/components/common"

import { SERVICES } from "./constants"

import styles from "./styles/style.module.scss"
import { dispatchProviderOffersMap, useProviderOffersMap } from "@/store"

export const BannerServices = () => {
    const [total, setTotal] = useState(0)
    const parentRef = useRef<HTMLUListElement>(null)
    const type = useProviderOffersMap(({ type }) => type)

    function onSearch(value: string) {}

    return !isMobile ? (
        <div className={styles.container}>
            <ul ref={parentRef}>
                <header>
                    <Segments
                        VALUES={SERVICES}
                        active={SERVICES.find((item) => item.value === type)!}
                        setActive={(value) => {
                            dispatchProviderOffersMap(value.value!)
                        }}
                        type="primary"
                        isBorder
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
                    <ServicesComponent setTotal={setTotal} />
                </div>
            </ul>
        </div>
    ) : null
}
