"use client"

import { dispatchCookies, useCookies } from "@/store"

import styles from "./style.module.scss"
import { Button } from "@/components/common"

export default function CookiesToast() {
  const visible = useCookies(({ visible }) => visible)

  function handle() {
    dispatchCookies()
  }

  return (
    <article className={styles.container} data-active={visible}>
      <p>
        Мы используем файлы <span>Cookies</span> от Яндекс.Метрика для сбора информации о вашем использовании этого сайта в целях улучшения
        его функциональности и предоставления вам более качественного обслуживания. Однако мы <span>НЕ</span> собираем и <span>НЕ</span>
        &nbsp;используем вашу личную информацию.
      </p>
      <Button label="Хорошо" onClick={handle} />
    </article>
  )
}
