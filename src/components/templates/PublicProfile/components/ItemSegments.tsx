"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

import type { TItemSegments } from "../types/types"

import { Segments } from "@/components/common/Segments"

import { VALUES } from "../constants/SEGMENTS"

export const ItemSegments: TItemSegments = ({ activeSegment, setActiveSegment }) => {
    const stickyRef = useRef<HTMLDivElement>(null)
    const { systemTheme } = useTheme()
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const profilePublicId = document.getElementById("profile-public-id")

        const handleScroll = () => {
            if (stickyRef.current) {
                const offset = stickyRef.current.getBoundingClientRect().top
                setIsSticky(offset <= 40)
            }
        }

        profilePublicId?.addEventListener("scroll", handleScroll)

        return () => profilePublicId?.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <section data-segments data-sticky={isSticky}>
            <Segments type="primary" VALUES={VALUES} active={activeSegment} setActive={setActiveSegment} isBorder />
        </section>
    )
}
