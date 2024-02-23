"use client"

import { useRef, useState } from "react"
import { isMobile } from "react-device-detect"

import { ServicesComponent } from "./components/Services"
import { SearchField } from "@/components/common"

import { dispatchCollapseServices, useCollapseServices } from "@/store"

import styles from "./styles/style.module.scss"

export const BannerServices = () => {
  const visible = useCollapseServices(({ visible }) => visible)
  const [total, setTotal] = useState(0)
  const parentRef = useRef<HTMLUListElement>(null)

  function onSearch(value: string) {}

  return !isMobile ? (
    <>
      <button
        data-collapse={visible}
        className={styles.buttonCollapse}
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          dispatchCollapseServices()
        }}
      >
        <img src="/svg/chevron-right-accent.svg" alt="right" width={12} height={12} />
      </button>
      <div className={styles.container} data-collapse={visible}>
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
    </>
  ) : null
}
