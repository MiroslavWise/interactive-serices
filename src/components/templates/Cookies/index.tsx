"use client"

import Link from "next/link"

import { Button } from "@/components/common"

import { dispatchCookies, useCookies } from "@/store"

import styles from "./style.module.scss"

export default function CookiesToast() {
  const visible = useCookies(({ visible }) => visible)

  function handle() {
    dispatchCookies()
  }

  return (
    <article className={styles.container} data-active={visible}>
      <p>
        Мы используем&nbsp;<Link href="/terms-rules">cookies</Link>&nbsp;для улучшения работы сайта. Оставаясь с нами, вы соглашаетесь на использование&nbsp;
        <Link
          href={{
            pathname: "/terms-rules"
          }}
        >
          файлов cookie
        </Link>
      </p>
      <Button label="Хорошо" onClick={handle} />
    </article>
  )
}
