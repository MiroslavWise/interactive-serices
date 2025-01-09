"use client"

import { clg } from "@console"
import Link from "next/link"
import { useEffect, useRef } from "react"

function PrivacyPolicy() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      const element = document.querySelector(".ymaps3x0--map-copyrights")
      clg("element: ", element)
      if (element) {
        const width = element.clientWidth + 8
        if (ref.current) {
          ref.current.style.right = `${width / 16}rem`
          ref.current.style.opacity = "1"
        }
      }
    }, 1_000)
  }, [])

  return (
    <article ref={ref} className="absolute hidden md:flex z-10 bottom-0 right-0 w-fit h-fit p-1 opacity-10">
      <Link href={{ pathname: "/legal/privacy-policy" }} target="_blank" className="text-xs font-light text-text-accent">
        Политика конфиденциальности
      </Link>
    </article>
  )
}

PrivacyPolicy.displayName = "PrivacyPolicy"
export default PrivacyPolicy
