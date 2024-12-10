"use client"

import Link from "next/link"

import Button from "@/components/common/Button"

import { cx } from "@/lib/cx"
import { dispatchCookies, useCookies } from "@/store"

export default function CookiesToast() {
  const visible = useCookies(({ visible }) => visible)

  return (
    <article
      className={cx(
        "fixed left-5 bottom-5 p-2 bg-element-accent-2 rounded-xl shadow-menu-absolute w-fit flex flex-wrap items-center gap-4 max-md:right-5 max-md:max-w-[calc(100%_-_2.5rem)] max-md:bottom-[calc(1.25rem_+_var(--height-mobile-footer-nav))] max-md:w-full",
        visible ? "z-[1000] opacity-100 visible" : "-z-10 opacity-0 invisible",
      )}
    >
      <p className="text-text-tab text-justify text-sm font-light [&>a]:font-medium [&>a]:text-link-color *:no-underline">
        Мы используем&nbsp;
        <Link href="/legal/terms-cookie" target="_blank">
          cookies
        </Link>
      </p>
      <Button
        type="button"
        label="OK"
        typeButton="fill-primary"
        onClick={dispatchCookies}
        className="ml-auto w-min h-9 rounded-[1.125rem]"
      />
    </article>
  )
}
