"use client"

import Link from "next/link"

import { Button } from "@/components/common"

import { cx } from "@/lib/cx"
import { dispatchCookies, useCookies } from "@/store"

export default function CookiesToast() {
  const visible = useCookies(({ visible }) => visible)

  return (
    <article
      className={cx(
        "fixed left-5 bottom-5 -z-10 opacity-0 invisible p-4 bg-element-accent-2 rounded-2xl shadow-menu-absolute w-full md:max-w-[22.5rem] flex flex-col gap-4 max-md:right-5 max-md:max-w-[calc(100%_-_2.5rem)] max-md:bottom-[calc(1.25rem_+_var(--height-mobile-footer-nav))]",
        visible && "!z-[1000] !opacity-100 !visible",
      )}
    >
      <p className="text-text-tab text-justify text-sm font-light [&>a]:font-medium [&>a]:text-link-color *:no-underline">
        Мы используем&nbsp;
        <Link href="/legal/terms-cookie" target="_blank">
          cookies
        </Link>
        &nbsp;для улучшения работы сайта. Оставаясь с нами, вы соглашаетесь на использование&nbsp;
        <Link
          href={{
            pathname: "/legal/terms-cookie",
          }}
          target="_blank"
        >
          файлов cookie
        </Link>
      </p>
      <Button
        type="button"
        label="Хорошо"
        typeButton="fill-primary"
        onClick={dispatchCookies}
        className="md:max-w-[10.625rem] h-9 rounded-[1.125rem]"
      />
    </article>
  )
}
