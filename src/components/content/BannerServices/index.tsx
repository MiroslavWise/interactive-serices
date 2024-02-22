"use client"

import { useRef, useState } from "react"
import { isMobile } from "react-device-detect"

import { ServicesComponent } from "./components/Services"
import { SearchField } from "@/components/common"

import styles from "./styles/style.module.scss"

export const BannerServices = () => {
  const [total, setTotal] = useState(0)
  const parentRef = useRef<HTMLUListElement>(null)

  function onSearch(value: string) {}

  return !isMobile ? (
    <div className={styles.container}>
      <ul ref={parentRef}>
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
