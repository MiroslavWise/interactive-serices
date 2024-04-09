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
        Мы используем <span>cookies</span> для улучшения работы сайта. Оставаясь с нами вы соглашаетесь на использование&nbsp;
        <span>файлов cookie</span>
      </p>
      <Button label="Хорошо" onClick={handle} />
    </article>
  )
}
