"use client"

import { useEffect, useRef, useState } from "react"

import type { TItemSegments } from "./types"

import { Segments } from "@/components/common/Segments"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const ItemSegments: TItemSegments = ({ activeSegment, setActiveSegment, values }) => {
  const stickyRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const profilePublicId = document.getElementById("profile-public-id")

    const handleScroll = () => {
      if (stickyRef.current) {
        const offset = stickyRef.current.getBoundingClientRect().top
        setIsSticky(offset <= 70)
      }
    }

    profilePublicId?.addEventListener("scroll", handleScroll)

    return () => profilePublicId?.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className={cx(styles.sectionSegments, isSticky && styles.sticky)} ref={stickyRef}>
      <Segments
        type="optional-1"
        values={values}
        active={activeSegment}
        setActive={setActiveSegment}
      />
    </section>
  )
}